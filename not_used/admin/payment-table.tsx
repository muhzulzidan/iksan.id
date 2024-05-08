"use client";

import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { usePathname } from "next/navigation";

import { Eye, MoreHorizontal, Check, Pencil, PlusCircle, CircleDollarSign, Wallet, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/utils/formatDate"; // Adjust the path based on your file structure
import { formatDateForInput } from "@/utils/formatDateForInput"; // Adjust the path based on your file structure

// Import necessary hooks and functions
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUser } from "@clerk/nextjs";
import Icons from "@/components/icons";

// Define form schema using Zod
const formSchema = z.object({
  amount: z.string().nonempty("Amount is required"),
  status: z.enum(["Pending", "Completed", "Failed"]),
  payment_date: z.string().nonempty("Payment Date is required"),
});

interface DataTableProps {
  data: PaymentWithCompany[];
  onRefresh: () => void;
  userType: "member" | "admin"; // New property
}

const PaymentTable: React.FC<DataTableProps> = ({
  data,
  onRefresh,
  userType,
}) => {
  const [checkedPayments, setCheckedPayments] = useState(new Set());
  const [paymentStatuses, setPaymentStatuses] = useState<{
    [key: string]: any;
  }>({});

  const [previousPaymentStatuses, setPreviousPaymentStatuses] = useState<{
    [key: string]: any;
  }>({});

  const [isCreatingPlan, setIsCreatingPlan] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const [refreshNeeded, setRefreshNeeded] = useState(false);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);

  const { user, isLoaded } = useUser();
  const [plans, setPlans] = useState([]); // State to store fetched plans

  const [editingPaymentId, setEditingPaymentId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>(""); // State for the select field

  const pathname = usePathname();
  const isMemberPath = pathname.startsWith("/member/");

    console.log(isMemberPath, "path name ");

  const pollingInterval = 50000;


  // Initialize useForm with ZodResolver
  const form = useForm<PaymentFormData>({
    resolver: zodResolver(formSchema),
  });

  type ToastVariant = "default" | "success" | "info" | "danger" | "destructive";

  const showToast = (type: ToastVariant, message: string) => {
    toast({ variant: type, title: message });
  };

  useEffect(() => {
    const checkInitialPaymentStatuses = async () => {
      const statuses: PaymentStatuses = {}; // Use the interface here
      for (const payment of data) {
        if (payment.transaction_id) {
          const status = await checkPaymentStatus(payment.transaction_id);
          statuses[payment.transaction_id] = status;
        }
      }
      setPaymentStatuses(statuses);
    };

    checkInitialPaymentStatuses();
  }, [data]);

  const checkPaymentStatus = async (paymentId: any) => {
    console.log("checkPaymentStatus");
    const xenditSecretKey = process.env.NEXT_PUBLIC_XENDIT_SECRET;
    const authHeader = `Basic ${Buffer.from(`${xenditSecretKey}:`).toString(
      "base64"
    )}`;
    try {
      const response = await fetch(
        `https://api.xendit.co/recurring/plans/${paymentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: authHeader,
            // Include your API key for authentication
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch payment status");
      }

      const planData = await response.json();
      // console.log(planData, "planData checkPaymentStatus ")
      // setPaymentStatuses(prevStatuses => ({ ...prevStatuses, [paymentId]: planData.status }));
      // console.log(planData, "planData checkPaymentStatus");

      return planData.status; // Return the status of the plan
      // Update the payment status using your actual function
      // handleUpdatePaymentStatus(planData.id, planData.status);

      // Optionally, refresh your local data if the status has changed
      // if (planData.status !== "PENDING") {
      //     onRefresh();
      // }
    } catch (error) {
      console.error("Error checking payment status:", error);
    }
  };


  // Step 2: Poll for Xendit Status Changes
  const pollPaymentStatuses = async () => {
    let shouldRefresh = false;
    const newStatuses = { ...paymentStatuses };

    for (const payment of data) {
      console.log(payment.transaction_id);
      if (payment.transaction_id) {
        console.log(payment.transaction_id, "after");
        const newStatus = await checkPaymentStatus(payment.transaction_id);
        if (
          paymentStatuses[payment.transaction_id] === "REQUIRES_ACTION" &&
          newStatus === "ACTIVE"
        ) {
          shouldRefresh = true;
        }
        newStatuses[payment.transaction_id] = newStatus;
      }
    }

    setPaymentStatuses(newStatuses);
    console.log(paymentStatuses, "paymentStatuses");
    console.log(shouldRefresh, "shouldRefresh");
    if (shouldRefresh) {
      setRefreshNeeded(true);
    }
  };

  useEffect(() => {
    if (refreshNeeded) {
      console.log(refreshNeeded, "refreshNeeded");
      onRefresh();
      setRefreshNeeded(false);
    }
  }, [refreshNeeded, onRefresh]);

  useEffect(() => {
    const interval = setInterval(() => {
      pollPaymentStatuses();
    }, pollingInterval);

    return () => clearInterval(interval);
  }, [data, paymentStatuses]);

  useEffect(() => {
    // Polling interval in milliseconds (e.g., 60000 for 1 minute)
    data.forEach((payment: any) => {
      // console.log(payment, "payment")
      // console.log(payment.id, "payment")
      // console.log(payment.status, "payment status")
      // if (payment.status === "REQUIRES_ACTION" || payment.status === "Pending") {
      // checkPaymentStatus(payment.transaction_id);
      // }
      checkPaymentStatus(payment.transaction_id);
    });
    if (editingPayment) {
      form.setValue("amount", editingPayment.amount || "");
      form.setValue("status", editingPayment.status || "Pending");
      form.setValue(
        "payment_date",
        editingPayment.payment_date
          ? formatDateForInput(editingPayment.payment_date)
          : ""
      );
    }
  }, [editingPayment, form]);

  const columns: ColumnDef<PaymentWithCompany>[] = [
    {
      accessorKey: "id",
      header: "Payment ID",
    },
    {
      accessorKey: "brand_name", // Access brand_name from the company object
      header: "Company Name",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "payment_date",
      header: "Date",
      cell: ({ cell }) => formatDate(cell.getValue()),
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original.payment; // Assuming payment is a property of row.original

        // console.log(paymentStatuses[payment?.transaction_id], "paymentStatuses")
        // console.log("Row data in actions cell:", row.original);  // Debug: Inspect the row data
        // Check if the payment status is 'Completed' and return nothing
        if (payment?.status === "Completed" && isMemberPath) {
          return null;
        }

        let actionButton;
        // console.log(payment && payment.transaction_id && paymentStatuses[payment.transaction_id] === "INACTIVE", "action button ")
        if (
          payment &&
          payment.transaction_id &&
          paymentStatuses[payment.transaction_id] === "REQUIRES_ACTION"
        ) {
          actionButton = (
            <DropdownMenuItem
              onClick={() => window.open(payment?.payment_url, "_blank")}
            >
              <Wallet className="h-4 w-4 mr-2" />
              <span>Pay Now</span>
            </DropdownMenuItem>
          );
        } else {
          actionButton = (
            <DropdownMenuItem
              onClick={() => initiateXenditPayment(row.original.id)}
            >
              <FileText className="h-4 w-4 mr-2" />
              <span>Create payment</span>
            </DropdownMenuItem>
          );
        }
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            
              {userType === "admin" ? (
                <>
                  {/* <DropdownMenuItem onClick={() => handleViewDetails(payment)}>
                    <div className="flex gap-2">
                      <Eye className="h-4 w-4" />
                      View
                    </div>
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() =>
                      handleEdit(row.original.id ?? -1, row.original.payment)
                    }
                  >
                    <div className="flex gap-2">
                      <Pencil className="h-4 w-4" />
                      Edit
                      {/* {row.original.payment ? "Edit" : "Add"} */}
                    </div>
                  </DropdownMenuItem>
                </>
              ) : (
                <>{actionButton}</>
              )}

              {/* Other actions... */}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const initiateXenditPayment = async (companyId: any) => {
    setIsCreatingPlan(true); // Start loading

    const staticAmount = 1000000; // 1 million Rupiah

    console.log(
      `Initiating payment for company ID: ${companyId}, amount: ${staticAmount}`
    );

    if (!companyId) {
      console.error("Company ID is missing");
      return;
    }

    try {
      // Fetch the Xendit customer ID using the Clerk user ID
      const customerRes = await fetch(
        `/api/payments/xendit/get-xendit-customer-id?userId=${user?.id}`
      );
      if (!customerRes.ok) {
        throw new Error("Failed to fetch Xendit customer ID");
      }
      const { xenditCustomerId } = await customerRes.json();

      // Create a subscription plan with the static amount
      const planRes = await fetch("/api/payments/xendit/create-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: xenditCustomerId,
          amount: staticAmount,
          // Add other necessary details for the subscription plan
        }),
      });

      if (!planRes.ok) {
        throw new Error("Failed to create subscription plan");
      }
      const planData = await planRes.json();

      // Save subscription plan data to your database
      const saveResponse = await fetch("/api/payments/save-subscription-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyId: companyId,
          subscriptionId: planData.id,
          amount: planData.amount,
          status: "Pending", // Or any other status you deem appropriate
          paymentUrl:
            planData.actions.find(
              (action: { action: string }) => action.action === "AUTH"
            )?.url || null,
        }),
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save subscription info");
      }

      if (!planRes.ok) {
        throw new Error("Failed to create subscription plan");
      }
      showToast("success", "Plan created successfully");

      console.log("Subscription plan created:", planData);
      console.log("Subscription Response saved :", saveResponse);
      onRefresh();
    } catch (error) {
      console.error("Error in creating subscription plan:", error);
      showToast("danger", `Error: ${error.message}`);
    } finally {
      setIsCreatingPlan(false); // Stop loading when done or if an error occurs
    }
  };

  // Add a button in your table for initiating payment
  // ...

  // Updated handleEdit function
  // Updated handleEdit function
  const handleEdit = (
    companyId: number,
    payment: Payment | null | undefined
  ) => {
    console.log("Editing payment for company ID:", companyId);
    console.log("Payment data:", payment);
    if (payment) {
      // Set values for each field individually
      form.setValue("amount", payment.amount);
      form.setValue("status", payment.status);
      form.setValue("payment_date", formatDateForInput(payment.payment_date));
      setEditingPayment(payment);
    } else {
      // Add new payment
      const newPayment = payment || {
        id: -1,
        company_id: companyId,
        amount: "",
        status: "Pending",
        payment_date: new Date().toISOString().split("T")[0],
        transaction_id: "",
        company: {
          id: companyId,
          brand_name: "", // Retrieve or set default brand name
        },
      };
      setEditingPayment(newPayment);
      setIsEditDialogOpen(true);
    }
    setIsEditDialogOpen(true);
  };

  // Handling form submission
  // Function to handle form submission
  // Handling form submission
  const onSubmit = async (values: PaymentFormData) => {
    setIsSubmitting(true);

    console.log("Form Data:", values);
    console.log("Editing Payment Data:", editingPayment);

    // Check if editingPayment has a valid ID and is not -1
    const isUpdating =
      editingPayment && editingPayment.id && editingPayment.id !== -1;
    console.log("Is Updating:", isUpdating);

    // Define the API endpoint
    const apiEndpoint = isUpdating ? "/api/payments" : "/api/payments/create"; // Adjust the endpoint for creating a payment if different

    // Prepare the data to be sent
    const dataToSend = {
      company_id: editingPayment?.company_id,
      amount: values.amount,
      status: values.status,
      payment_date: values.payment_date,
      ...(isUpdating && { paymentId: editingPayment.id }), // Include payment ID if updating
    };

    try {
      // Send the data to the API
      const response = await fetch(apiEndpoint, {
        method: isUpdating ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast({
          variant: "success",
          title: `Payment ${isUpdating ? "updated" : "added"} successfully`,
        });
        onRefresh(); // Refresh data to show updated or new payment
      } else {
        // Handle errors
        console.error("Error in payment operation:", responseData.error);
        toast({ variant: "danger", title: `Error: ${responseData.error}` });
      }
    } catch (error) {
      console.error("Error in payment operation:", error);
      toast({ variant: "danger", title: `Error: ${error.message}` });
    } finally {
      setIsSubmitting(false);
    }

    setIsEditDialogOpen(false);
  };

  const handleSaveEdit = async () => {
    setIsSavingEdit(true);
    try {
      // Implement API call to save edited payment details
      setIsEditDialogOpen(false);
      onRefresh(); // Refresh data
      showToast("success", "Edit saved successfully");
    } catch (error) {
      showToast("danger", "Failed to save edit");
    } finally {
      setIsSavingEdit(false);
    }
  };

  const initiatePaymentForCompany = (companyId: number) => {
    // Your logic here
    console.log(`Initiating payment for company ID: ${companyId}`);
    // ... more logic
  };
  const handleUpdatePaymentStatus = async (
    paymentId: number,
    newStatus: string
  ) => {
    console.log("handleUpdatePaymentStatus");
    try {
      const response = await fetch("/api/payments", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId, status: newStatus }),
      });

      if (response.ok) {
        toast({
          variant: "success",
          title: "Payment status updated successfully",
        });
        onRefresh(); // Refresh data to show updated status
      } else {
        // Handle errors
        console.error("Error updating payment status");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  const handleViewDetails = (payment: Payment | null | undefined) => {
    if (!payment) {
      console.log("No payment details available");
      return;
    }
    // Existing logic for handling payment details...
    console.log("View details for:", payment);
    toast({
      variant: "info",
      title: `View details for: ${payment}`,
    });
  };

  const handlePay = (paymentId: Payment | null) => {
    if (!paymentId) {
      // Handle the case where payment is null
      console.log("No payment details available");
      return;
    }
    // Implement your logic to create a payment request to Xendit
    // Example: const paymentUrl = await createXenditPayment(paymentId);
    // Redirect to Xendit payment page: window.location.href = paymentUrl;
    console.log("View details for:", paymentId);
    toast({
      title: `Pay for ${paymentId.company.brand_name}`,
    });
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <Dialog open={isCreatingPlan}>
        <DialogContent className="flex flex-col justify-center items-center py-24 gap-8">
          <Icons.spinner className="h-12 w-12 animate-spin" />
          <p className="text-lg">Creating Payment...</p>
        </DialogContent>
      </Dialog>
      <Dialog open={isLoading}>
        <DialogContent className="flex flex-col justify-center items-center py-24 gap-8">
          <Icons.spinner className="h-12 w-12 animate-spin" />
          <p className="text-lg">Processing...</p>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditing}>
        <DialogContent className="flex flex-col justify-center items-center py-24 gap-8">
          <Icons.spinner className="h-12 w-12 animate-spin" />
          <p className="text-lg">Editing Payment...</p>
        </DialogContent>
      </Dialog>

      {isEditDialogOpen && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Amount" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Failed">Failed</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Additional fields as required */}
                <Button type="submit">Save Changes</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}

      <div className="flex items-center py-4">
        <div className="grid grid-cols-2 gap-4 w-1/2">
          <Input
            placeholder="Filter Brand Name..."
            onChange={(event: { target: { value: any } }) => {
              const value = event.target.value;
              setColumnFilters((old: any[]) =>
                old
                  .filter(
                    (filter: { id: string }) => filter.id !== "brand_name"
                  )
                  .concat(value ? [{ id: "brand_name", value }] : [])
              );
            }}
          />
          <Input
            placeholder="Filter Status"
            onChange={(event: { target: { value: any } }) => {
              const value = event.target.value;
              setColumnFilters((old: any[]) =>
                old
                  .filter((filter: { id: string }) => filter.id !== "status")
                  .concat(value ? [{ id: "status", value }] : [])
              );
            }}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Filter Column
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column: { getCanHide: () => any }) =>
                column.getCanHide()
              )
              .map(
                (column: {
                  id: any;
                  getIsVisible: () => any;
                  toggleVisibility: (arg0: boolean) => any;
                }) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: any) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                }
              )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table
              .getHeaderGroups()
              .map((headerGroup: { id: any; headers: any[] }) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(
                    (header: {
                      id: any;
                      column: { columnDef: { header: any } };
                      getContext: () => any;
                    }) => (
                      <TableCell key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))}
          </TableHeader>
          <TableBody>
            {table
              .getRowModel()
              .rows.map((row: { id: any; getVisibleCells: () => any[] }) => (
                <TableRow key={row.id}>
                  {row
                    .getVisibleCells()
                    .map(
                      (cell: {
                        id: any;
                        column: { columnDef: { cell: any } };
                        getContext: () => any;
                      }) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      )
                    )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setPagination((old) => ({
              ...old,
              pageIndex: Math.max(0, old.pageIndex - 1),
            }))
          }
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span>
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>{" "}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setPagination((old) => ({ ...old, pageIndex: old.pageIndex + 1 }))
          }
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaymentTable;

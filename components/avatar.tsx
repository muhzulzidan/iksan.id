import Image from 'next/image'

export default function Avatar({ author }: { author: any }) {
  const isAuthorHaveFullName = author?.node?.firstName && author?.node?.lastName
  const name = isAuthorHaveFullName
    ? `${author.node.firstName} ${author.node.lastName}`
    : author.node.name || null

  return (
    <div className=" items-center flex ">
      {/* <div className="w-12 h-12 relative mr-4">
        <Image
          src={author.node.avatar.url}
          layout="fill"
          className="rounded-full"
          alt={name}
        />
      </div> */}
      <div className="text-sm text-stone-700">Ditulis Oleh : {name}</div>
    </div>
  )
}

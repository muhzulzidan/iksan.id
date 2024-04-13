const generateSlug = (name: string) => {
    return name
        .toLowerCase()
        .replace(/ /g, '-') // Replace spaces with -
        .replace(/[^\w-]+/g, ''); // Remove all non-word chars
};


export default generateSlug
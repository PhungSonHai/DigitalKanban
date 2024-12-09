function getCurrentDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    // const mm = today.getMonth() + 1
    // const dd = today.getDate()

    const formattedDate = `${yyyy}-${mm}-${dd}`;

    return formattedDate
}

export default getCurrentDate
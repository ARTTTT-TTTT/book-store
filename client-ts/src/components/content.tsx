function Content() {
    // Assume you have data from the database
    const dataFromDatabase = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
        // Add more data as needed
    ];

    return (
        <div className="content">
            <h2>Data</h2>
            <ul className="content-list">
                {dataFromDatabase.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Content;

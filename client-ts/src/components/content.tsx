function Content() {

    const dataFromDatabase = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" },
        { id: 4, name: "Item 3" },
        { id: 5, name: "Item 3" },
        { id: 6, name: "Item 3", description: "", year: "" },
        { id: 7, name: "Item 3", description: "", year: "" },
        { id: 8, name: "Item 3", description: "", year: "" },
        { id: 9, name: "Item 3", description: "", year: "" },
        { id: 10, name: "Item 3", description: "", year: "" },
    ];

    return (
        <div className="content">
            <div className="content-main">
                <div className="content-header">
                    <h3>Book Lists</h3>
                </div>
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataFromDatabase.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Content;

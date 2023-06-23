import React, { useEffect, useState } from "react";

function Test() {
    const [rows, setRows] = useState([]);

    useEffect(function () {
        function ListenHandle(e) {
            setRows(state => [...state, e.message]);
        }

        window.Echo.channel("messanger").listen("MessageSent", ListenHandle);

        return function () {
            window.Echo.channel("messanger").stopListening(
                "MessageSent",
                ListenHandle
            );
        };
    }, []);

    return (
        <div>
            <h1>Welcome</h1>
            <div>
                {rows.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        </div>
    );
}

export default Test;

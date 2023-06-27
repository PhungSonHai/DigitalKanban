import React, { useEffect, useState } from "react";

function Test2() {
    return (
        <div>
            <form
                action="/api/test2"
                method="post"
                encType="multipart/form-data"
            >
                <input type="file" name="file" />

                <input type="submit" value="gửi" />
            </form>
        </div>
    );
}

export default Test2;

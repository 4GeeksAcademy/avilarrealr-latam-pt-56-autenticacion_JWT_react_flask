import React from "react";

export function SingUpHeader({ label }) {

    return (
        <div className="px-5 py-4 d-flex flex-column align-items-start w-100">
            <h1 className="">{label}</h1>
            <p className="text-muted">Access to your account</p>
        </div>
    )
}
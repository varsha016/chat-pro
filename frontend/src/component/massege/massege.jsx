import React from 'react'
import "./massege.css"

export default function Massege({ user, massege, classs }) {
    if (user) {
        return <>

            <div className={`massegeBox ${classs}`}>
                {`${user}:${massege}`}
            </div>
        </>
    } else {



        return <>

            <div className={`massegeBox ${classs}`}>
                {`YOU:${massege}`}
            </div>
        </>
    }

}

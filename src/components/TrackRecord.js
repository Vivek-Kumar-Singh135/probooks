import React from "react";

const TrackRecord = ({bookRecord}) => {
    const list = bookRecord
    return(
        <div className="book-record-container">
        <div className="book-record">
            <div>Books Read : {list[0]}</div>
            <div>Books Liked : {list[1]}</div> 
            <div>Books Disliked : {list[2]}</div> 
            <div>Books Deleted : {list[3]}</div>
        </div>
        </div>
    )
}

export {TrackRecord}
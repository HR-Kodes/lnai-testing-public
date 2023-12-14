import React from 'react';

function Widget({title,children}) {
    return (
        <div className="widget-item" >
            <h4 className="widget-title" style={{ color: "white"}}>{title}</h4>
            <div className="widget-body">
                {children}
            </div>
        </div>
    );
}

export default Widget;
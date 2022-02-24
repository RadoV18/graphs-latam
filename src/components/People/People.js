import React from 'react'

const People = (props) => {
    return (
        <div>
            <div className="person">
                <div className="image">
                    <h5>Estudiante:</h5>
                    <img src={props.img}></img>
                </div>
                <div className="description">
                    <article>
                        <span>{props.name}</span>
                        <span>{props.uni}</span>
                    </article>
                </div>
            </div>
        </div>
    )
}

export default People;

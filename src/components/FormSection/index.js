/**
 * Cambia el estado del input
 */
const handleArrayChange = (key, index, event) => {
    const { value } = event.target;
    const arr = [...values[key]];
    arr[index] = value;
    setValues({
        ...values,
        [key]: arr
    });
};

/**
 * Añade filas 
 */

 const addElement = (key, event) => {
    event.preventDefault();
    setValues({
        ...values,
        [key]: values[key].concat("")
    });

    
};

/**
 * Elimina filas
 */

 const removeElement = (key, index, event) => {
    event.preventDefault();
    if(values[key].length > 1) {
        const newArray = values[key].filter((value, i) => index !== i);
        setValues({
            ...values,
            [key]: newArray
        });
    }
};

/**
 * const inputChange = handleChange(e, i, j) => () => {
 *      e.preventDefault();
 *      setTable(tabla.map)
 * } 
 * <table>
 *   <tbody>
 *       columnas
 *       <tr>
 *          <td>a</td>
 *       </tr>
 *       falta filas
 *       <tr>
 *          <td><input type="text" onChange={(e) => handleChange(e, i, j)}></td>
 *       </tr>
 *   </tbody>
 * </table>
 * 
 * /

/**
 * FormSection solo es un texto y un boton que cuando haces click agregas un elemento a la lista
 */
<FormSection text="Requirements" addElement={e => addElement("requirements", e)} buttonText="Add requirement" />
                            {values.requirements.map((elem, index) => {
                                const key = `req-${index}`;
                                const err = index + 1 === values.requirements.length ?
                                            errors.requirements
                                            : undefined;
                                return (
                                    <TextInput
                                        key={key}
                                        labelFor={key}
                                        text={`Requirement #${index + 1}`}
                                        value={values.requirements[index]}
                                        changeHandler={e => handleArrayChange("requirements", index, e)}
                                        name={key}
                                        id={key}
                                        remove={true}
                                        removeHandler={e => removeElement("requirements", index, e)}
                                        err={err}
                                    />
                                );
                            })}

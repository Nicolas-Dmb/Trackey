import React from "react";

//fonctionne seulement avec l'array copropriete et non avec key ou autre
const SearchBar = ({setCopros, coproprietes}) => {
    const HandleChange = (e)=>{
        e.preventDefault()
        if ((e.target.value).length > 0){
            const result = coproprietes.filter((item)=>{
                return(
                    String(item.Numero).includes(e.target.value)||
                    item.name.toLowerCase().includes((e.target.value).toLowerCase()) ||
                    item.adresse.toLowerCase().includes((e.target.value).toLowerCase())
                );
            });
            setCopros(result)
        }else{
            setCopros(coproprietes)
        }
    };


    return(
        <input type='search' placeholder="Rechercher..." onChange={HandleChange}/>
    )
}
export default SearchBar;
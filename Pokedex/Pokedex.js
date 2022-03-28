const fetchPokemon = () => 
{
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res) => 
    {
        if(res.status != '200')
        {
            console.log(res);
            pokeImage("Img/No_found.jpg");
            PokeNames("Desconocido");
            PokeID("----");
            PokeType1("----");
            PokeType2("----");
        }
        else
        {
            return res.json();
        }
    }).then((data) => {
        console.log(data);
        let pokeimg = data.sprites.front_default;
        let pokeID = data.id;
        let poketypes = [];
        let pokestats = [];
        let text = "";
        for(var i = 0; i < data.types.length; i++)
        {
            poketypes.push(data.types[i].type.name);
        }
        for(var i = 0; i < data.stats.length; i++)
        {
            pokestats.push(data.stats[i].base_stat);
        }
        for(var i = 0; i < data.moves.length; i++)
        {
            text = text + data.moves[i].move.name + "\n";
        }
        console.log(pokeimg);
        pokeImage(pokeimg);
        PokeNames(pokeName.value.toUpperCase());
        PokeID(pokeID);
        PokeType1(poketypes.pop());
        Addpokestats(pokestats);
        Moves(text);
        if(poketypes.length > 0)
            PokeType2(poketypes.pop());
        else
            PokeType2("----");
    });
}

fetchPokemon();

const pokeImage = (url) =>
{
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
}

const PokeNames = (url) => 
{
    const Names = document.getElementById("Names").innerHTML = url;
}

const PokeID = (url) =>
{
    const ID = document.getElementById("id").innerHTML = url;
}

const PokeType1 = (url) =>
{
    const TYPE = document.getElementById("type1");
    TYPE.src = "Img/" + url + ".gif";
}

const PokeType2 = (url) =>
{
    const TYPE = document.getElementById("type2");
    TYPE.src = "Img/" + url + ".gif";
    if(url == "----")
        var ID = document.getElementById("type2").innerHTML = url;
}

const Addpokestats = (pokestats) =>
{
    let categories = ['HP', 'ATTACK', 'DEFENSE', 'SPECIAL-ATTACK', 'SPECIAL-DEFENSE', 'SPEED'];
    for(var i = 0; i < pokestats.length; i++)
    {
        const ID = document.getElementById(categories[i]).innerHTML = pokestats[i];
    }
}

const Moves = (text) => {
    const Moves = document.getElementById("moves").innerHTML = text;
}
class pokemonTCGCatalog{
    constructor(){
        this.cards = [];

        this.catalog = null;


        this.API = 'https://api.pokemontcg.io';
        this.API_VERSION = 'v1';
        this.API_RESOURCE = 'cards';

        this.API_ENDPOINT = `${this.API}/${this.API_VERSION}/${this.API_RESOURCE}`

        this.UiSelectors = {
            content: '[data-content]'
        } 

    }
    
    initializeCatalog(){
        this.catalog = document.querySelector(this.UiSelectors.content);

        this.pullCards();
    }

    async pullCards(){
        const {cards} = await this.fetchData(this.API_ENDPOINT);

        this.cards = [...cards]
        this.createCatalog(this.cards);
        console.log(cards);

    }

    async fetchData(url){
        const response = await fetch(url);
        const parsedResponse = await response.json();

        return parsedResponse
    }

    createCatalog(cards) {
        this.catalog.innerHTML +=[
            cards.map((card) => this.createCard(card)).join('')
        ]
    }

    createCard({name, number, imageUrl, supertype, subtype, rarity}){
        return `
            <article class="card col-lg-3 col-md-6 col-12"> 
                <header class="card__header">
                    <h2 class="card__heading">
                        ${name}
                    </h2>
                    <p class="card__number">
                        ${number}
                    </p>
                </header>
                <img class="img-fluid" src="${imageUrl}" alt="${name}">
                <div class="card__info">Supertype: ${supertype}</div>
                <div class="card__info">Subtape: ${subtype}</div>
                <div class="card__info">Rarity: ${rarity}</div>
            </article>
        `
    }
}




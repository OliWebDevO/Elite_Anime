// variables de nour :
let nav = document.querySelector('nav')
let allAnime = ""




// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
var query = `
query { # La requête ne nécessite aucune variable
  Page {
    media(type: ANIME) { # Récupérer tous les médias de type ANIME
      id
      title {
        romaji
        english
        native
      }
      bannerImage
      averageScore
      description
      coverImage {
        extraLarge
      }
      episodes
      duration
      genres
      reviews {
        edges {
          node {
            id
            summary
            body
            user {
              name
              avatar{
                large
              }
            }
            siteUrl
          }
        }
      }
      studios {
        edges {
          node {
            id
            name
          }
        }
      }
      trailer {
        site
        thumbnail
      }
      

    }
  }
}
`;

// Définir les variables de la requête (dans ce cas, aucun besoin de spécifier un média spécifique)
var variables = {};

// Définir la configuration requise pour la demande API
var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

    fetch(url, options)
    .then(response => response.json())
    .then(data => {
      const mediaList = data.data;
      // Afficher les médias dans la console
      console.log(mediaList);
      
    })
    .catch(error => {console.logg("Erreur lors de la récup des données :", error)});
// event de nour

nav.addEventListener("click", function(e){
  // vérifier si l'élément sur lequel on click c'estt bien celui qui nous intéresse
    if(e.target.classList.contains('button')){
        // on vérifie si l'élément clické a la classe active, on le retire. si on met rien dans le if, c'estt d'office true
      if(e.target.classList.contains('active')){
        // si la réponse est true :
        // toggle enlève si elle est là, met si elle n'est pas là
        e.target.classList.toggle('active')
        // si l'élément clické n'a pas la classe active, on l'ajoute'
      } else {
        
      //  maintenant, on doit vérifier si un autre enfant a la classe Active, on doit le retirer
        // Si le parent (wrapper) a un autre enfant (qque celui sur lequel je click) qui a la classe active ... 
        if(nav.querySelector('.active')){
          nav.querySelector('.active').classList.remove('active')
            e.target.classList.add('active')
          
        // Si le parent (wrapper) n'a pas la classe active sur un des enfants on l'ajoutte sur le bttn clické
        } else {
            e.target.classList.toggle('active')
        }
    }
    }
})


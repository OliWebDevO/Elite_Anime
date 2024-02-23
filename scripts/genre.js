// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible

// tippy('swiper-slide', {
//   content: 'My tooltip!',
// });

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    grabCursor: true,
    keyboard: {
          enabled: false,
        },
    breakpoints: {
          1: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
        },
    centeredSlides: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    }
  });
  
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
  const wrapper = document.querySelector('.wrapper')
  const popup = document.querySelector('.popup')
  let titre1 = document.querySelector('.unun')
  let container1 = document.querySelector('.un')
  let container2 = document.querySelector('.deux')
  let container3 = document.querySelector('.trois')
  let container4 = document.querySelector('.quatre')
  let container5 = document.querySelector('.cinq')
  let container6 = document.querySelector('.six')
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
  
      function searchAnimeBy(genre, container) {
        for (let i = 0; i < mediaList.Page.media.length; i++) {
          for (let n = 0; n < mediaList.Page.media[i].genres.length; n++) {
            if (mediaList.Page.media[i].genres[n] == genre) {
              if (mediaList.Page.media[i].title.english == null) {
                container.innerHTML += `<div class="swiper-slide" data-index="${i}"><img src="${mediaList.Page.media[i].coverImage.extraLarge}" alt=""><h3>${mediaList.Page.media[i].title.romaji}</h3></div>`
               } else if (mediaList.Page.media[i].title.english == "Cowboy Bebop: The Movie - Knockin' on Heaven's Door") {
                container.innerHTML += `<div class="swiper-slide" data-index="${i}"><img src="${mediaList.Page.media[i].coverImage.extraLarge}" alt=""><h3>Cowboy Bebop: The Movie</h3></div>`
               }
               else if (mediaList.Page.media[i].title.english == "Cowboy Bebop: The Movie - Knockin' on Heaven's Door") {
                container.innerHTML += `<div class="swiper-slide" data-index="${i}"><img src="${mediaList.Page.media[i].coverImage.extraLarge}" alt=""><h3>Cowboy Bebop: The Movie</h3></div>`
               }
              else {
              container.innerHTML += `<div class="swiper-slide" data-index="${i}"><img src="${mediaList.Page.media[i].coverImage.extraLarge}" alt=""><h3>${mediaList.Page.media[i].title.english}</h3></div>`
              }
            }
          }

          // wrapper.addEventListener("mouseover", (event) => {
          //   if(event.target.closest('.swiper-slide').classList.contains('swiper-slide')) {
          //     let tips = event.target.closest('.swiper-slide').dataset.index
          //     // tippy(`${event.target.closest('.swiper-slide')}`, {
          //     //   content: `${mediaList.Page.media[tips].description}`,
          //     // });
              
          //     document.querySelector('.note').classList.add.active
              
          //    }
          // });

          tippy('swiper-slide', {
            content: 'My tooltip!',
          });

          // Délégation d'event sur wrapper pour catcher un click sur un anime
      wrapper.addEventListener('click', function(event){
        if(event.target.closest('.swiper-slide').classList.contains('swiper-slide')) 
          {
        let index = event.target.closest('.swiper-slide').dataset.index 
        popup.innerHTML = ""
        popup.innerHTML = `
        <div class="popup__img">
          
          <img src="${mediaList.Page.media[index].coverImage.extraLarge}">
        </div>
        <div class="popup__txt">
          <h3>${mediaList.Page.media[index].title.english}</h3>
          <h5>Genres : ${mediaList.Page.media[index].genres}</h5>
          <div class="flex">
          <div class="subflex">
          <h5> Studio : ${mediaList.Page.media[index].studios.edges[0].node.name}</h5>
          <h5> Score : ${mediaList.Page.media[index].averageScore} / 100 </h5>
          </div>
          <div class="subflex">
          <h5> Nombre d'épisodes : ${mediaList.Page.media[index].episodes}</h5>
          <h5>Durée : ${mediaList.Page.media[index].duration} min</h5>
          </div>
          </div>

          <p>${mediaList.Page.media[index].description}</p>
          
          
        </div>
        <div class="close" title="fermer">❌</div>
        `
        popup.classList.add('active')
         }
      })
    // Délégation d'event sur popup pour aller chercher la ❌
    popup.addEventListener("click", function(event) {
      if (event.target.classList.contains('close')) {
        event.target.closest('.popup').classList.remove("active")
      }
    })
        }
      }
  
      searchAnimeBy("Action", container1)
      searchAnimeBy("Adventure", container2)
      searchAnimeBy("Comedy", container3)
      searchAnimeBy("Horror", container4)
      searchAnimeBy("Drama", container5)
      searchAnimeBy("Romance", container6)

    })
    .catch(error => {console.log("Erreur lors de la récup des données :", error)});
  




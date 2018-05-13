(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
 


    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
       
  //       $.ajax({
  //  			 url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`
		// }).done(addImage);
     //    const unsplashRequest = new XMLHttpRequest();
	    // unsplashRequest.onload = addImage;
	    // unsplashRequest.onerror = function(err){
	    // 	requestError(err, 'image');
	    // };
	    // unsplashRequest.open('GET', `https://api.unsplash.com/search/
	    // 	photos?page=1&query=${searchedForText}`);

	    // unsplashRequest.setRequestHeader('Authorization', 'Client-ID de8dc930833f844d8e365e86a0c9712a04797d3026dfbafdf5c0ef8df2be4ef1');
	    // unsplashRequest.send();

		// const articleRequest = new XMLHttpRequest();
		// articleRequest.onload = addArticles;
		// articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=2947b6fe5e6f47aa81d76e5003eda120`);
		// articleRequest.send();
    });

    fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
    headers: {
        Authorization: 'Client-ID 79771e28ad522e16587d12e5b33947fe4a516fbded23b62071fb566b43807739'
     }
	}).then(response => response.json())
		.then(addImage)
		.catch(e => requestError(e, 'image'));

    function addImage(data){
    	console.log(data);
    	// debugger;
    	let htmlContent = '';
		// let htmlContent = '';
		// const data = JSON.parse(this.responseText);

		if (data && data.results && data.results[0]){
			const firstImage = data.results[0];
			htmlContent = `<figure>
			<img src="${firstImage.urls.regular}" alt="${searchedForText}">
			<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
			</figure>`;
			} else {
				htmlContent = `<div class="error-no-image">No Images Available</div>`;
			}
			responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
		}
	function requestError(e, part){
		console.log(e);
		responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`)
	}

	//use fetch request to get articles from NYT
	fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=2947b6fe5e6f47aa81d76e5003eda120`)
	.then(response => response.json())
	.then(addArticles)
	.catch(e => requestErrorArticle(e, 'article'));

	function addArticles (data) {
		console.log(data);
		// debugger;
		let htmlContent = '';
		// const data = JSON.parse(this.responseText);
		// const firstArticle = articles;

		if (data.response && data.response.docs && data.response.docs.length > 1){
			htmlContent = '<ul>' + data.response.docs.map(article =>
				`<li class="article"> <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
				<p>${article.snippet}</p>
				</li>`
				).join('')+'</ul>';
			} else {
				htmlContent = `<div class="error-no-article">No Articles Available</div>`;
			}
			responseContainer.insertAdjacentHTML('beforeend', htmlContent);
		}
	function requestErrorArticle(e, part){
		console.log(e);
		responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`)
	}

})();


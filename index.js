function handleSubmitButton() {
    $('form').submit(function(event){
        event.preventDefault();
        let username = $('#user-search-text').val();
        // logUsersRepos(username);
        renderRepos(username);
    })
}

// function logUsersRepos(username) {
//     fetch(`http://api.github.com/users/${username}/repos`)
//         .then(response => response.json())
//         .then(responseJSON => console.log(responseJSON))
//         .catch(error => console.log(error));
// }

function renderRepos(username) {
    fetch(`http://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(responseJSON => {
            console.log(responseJSON);
            if (responseJSON.message === "Not Found") {
                generateErrorMessage();
            } else {
                generateRepos(responseJSON);
            }})
        .catch(generateErrorMessage());
}

function generateRepos(responseJSON) {
    let results = [];
    for (let i = 0; i < responseJSON.length; i++) {
        results.push(`
            <li>
                <a href="${responseJSON[i].html_url}" target="_blank">${responseJSON[i].name}</a>
            </li>
        `);
    }
    results.join('');
    $('.search-results').html(results);
}

function generateErrorMessage() {
    $('.search-results').html(`<p>No results found</p>`);
}

function handleOurButtons() {
    handleSubmitButton();
}

$(handleOurButtons)
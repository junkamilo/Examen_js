const jsons = [];

async function fetchData() {
    const usuarios = await fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json());
    const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json());
    const comentarios = await fetch("https://jsonplaceholder.typicode.com/comments").then(res => res.json());
    const albumes = await fetch("https://jsonplaceholder.typicode.com/albums").then(res => res.json());
    const fotos = await fetch("https://jsonplaceholder.typicode.com/photos").then(res => res.json());

    const results = usuarios.map(user => {
        const userPosts = posts.filter(post => post.userId === user.id).map(post => {
            const postComments = comentarios.filter(comment => comment.postId === post.id);
            return {
                ...post,
                comentarios : postComments
            };
        });

        const userAlbums = albumes.filter(album => album.userId === user.id).map(album => {
            const albumPhotos = fotos.filter(photo => photo.albumId === album.id);
            return {
                ...album,
                fotos  : albumPhotos
            };
        });

        return {
            user,
            userPosts,
            userAlbums
        };
    });

    results.forEach(result => {
        console.log(`Usuario: ${result.user.name}`);
        console.log(`Publicaciones: ${JSON.stringify(result.userPosts, null, 2)}`);
        console.log(`Álbumes: ${JSON.stringify(result.userAlbums, null, 2)}`);
    });
}

fetchData();


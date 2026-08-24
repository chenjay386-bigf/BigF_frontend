import "./home.css";

function CommunityFeed() {

    const recipes = [

        {
            id:1,
            name:"Chicken Noodles",
            user:"Mary",
            likes:320,
            comments:41
        },

        {
            id:2,
            name:"Beef Noodles",
            user:"Kevin",
            likes:291,
            comments:33
        },

        {
            id:3,
            name:"Spicy Noodles",
            user:"Ann",
            likes:540,
            comments:76
        }

    ]

    return(

        <section className="feed">

            <h2>Community Feed</h2>

            {

                recipes.map(recipe=>(

                    <div className="feed-card" key={recipe.id}>

                        <div className="video-placeholder">

                            Video Preview

                        </div>

                        <h3>{recipe.name}</h3>

                        <p>By {recipe.user}</p>

                        <div className="stats">

                            ❤️ {recipe.likes}

                            💬 {recipe.comments}

                        </div>

                    </div>

                ))

            }

        </section>

    )

}

export default CommunityFeed;
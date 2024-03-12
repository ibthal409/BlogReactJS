// import axios from "axios";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Home() {
  // const posts = [
  //   {
  //     title: "Carrot Cake Coffee Cake",
  //     description:
  //       "1. **Make your batter:** Grab a large bowl and mix up a very simple batter with eggs, flour, sugar, cinnamon, and use vegetable oil 2. **Mix it up:** Bring all your streusel ingredients together in a small bowl and pulse things up until you get a pebble-like texture. 3. **Bake!** Grease your pan or put some parchment paper in there. Now it gets baked under an aggressively thick layer of streusel.",
  //     imageUrl:
  //       "https://pinchofyum.com/cdn-cgi/image/width=680,height=99999,fit=scale-down/wp-content/uploads/Carrot-Cake-Coffee-Cake-Batter.jpg",
  //     UserName: "Ibthal",
  //     id: 41,
  //   },
  //   {
  //     title: "Cake",
  //     description:
  //       "1. **Make your batter:** Grab a large bowl and mix up a very simple batter with eggs, flour, sugar, cinnamon, and use vegetable oil 2. **Mix it up:** Bring all your streusel ingredients together in a small bowl and pulse things up until you get a pebble-like texture. 3. **Bake!** Grease your pan or put some parchment paper in there. Now it gets baked under an aggressively thick layer of streusel.",
  //     imageUrl:
  //       "https://pinchofyum.com/cdn-cgi/image/width=680,height=99999,fit=scale-down/wp-content/uploads/Carrot-Cake-Coffee-Cake-1.jpg",
  //     UserName: "Ibthal",
  //     id: 44,
  //   },
  //   {
  //     title: "Spaghetti with Crispy Zucchini",
  //     description:
  //       "To make this happen you’re going to have two main spots you’re working on (and I use the term “working on” very loosely):\n.\n1-Your pasta pot (boil spaghetti / mix with sauce)\n2-Your sheet pan (toss zucchini with panko and spices, bake until yummy)\n.\nAnd with minimal effort, look at what you’re eating for dinner: a hot, twirly bowl of spaghetti loaded high with cheesy zucchini crispities and fresh basil. Add some extra lemon juice or red pepper flakes to wake it all up and this is not a sad dinner situation.",
  //     imageUrl:
  //       "https://pinchofyum.com/cdn-cgi/image/width=680,height=99999,fit=scale-down/wp-content/uploads/Crispy-Zucchini-Spaghetti-2.jpg",
  //     UserName: "Ibthal",
  //     id: 47,
  //   },
  //   {
  //     title: "dsdfs9999",
  //     description: "gyghjghjghjhg",
  //     imageUrl:
  //       "https://pinchofyum.com/cdn-cgi/image/width=680,height=99999,fit=scale-down/wp-content/uploads/Carrot-Cake-Coffee-Cake-1.jpg",
  //     UserName: "Ibthal",
  //     userID: 36,
  //     id: 48,
  //   },
  // ];
  const [posts, setPosts] = useState([]);
  console.log(posts);
  const cat = useLocation().search;
  console.log(cat);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/blogs/${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [cat]);
  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Our Blog
          </h2>
          <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            We use an agile approach to test assumptions and connect with the
            needs of your audience early and often.
          </p>
        </div>
        <div class="grid gap-8   lg:grid-cols-2 md:grid-cols-2">
          {console.log(posts)}
          {posts.map((post) => (
            <article
              key={post.id}
              class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700  h-100	"
            >
              {/* <div class="card  w-96  glass"> */}
              <div class="flex justify-between items-center mb-5 text-gray-500">
                <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                  <svg
                    class="mr-1 w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                  </svg>
                  {post.category}{" "}
                </span>
                <span class="text-sm">14 days ago</span>
              </div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <Link to={`/post/${post._id}`}>{post.title}</Link>
                {/* {console.log(post._id, post.title)} */}
              </h2>
              <div className="relative h-64 w-90 overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 ">
                <figure>
                  <img
                    src={`../../public/images/${post.image}`}
                    alt={`${post.title}`}
                    className="h-64 w-full object-cover object-center md-h-80"
                  />
                  {console.log(post.image)}
                </figure>
              </div>

              <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                {post.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img
                    className="w-7 h-7 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                    alt="Jese Leos avatar"
                  />
                  <span className="font-medium dark:text-white">
                    {post.UserName}
                  </span>
                </div>
                {/* <a
                  href="#"
                  className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                > */}
                <Link
                  className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
                  to={`/post/${post._id}`}
                >
                  {" "}
                  Read more
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </Link>

                {/* </a> */}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

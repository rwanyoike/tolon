/**
 * The search function queries a source for page discussions.
 * @param {string} url - The page url to query.
 * @param {object} session - The source session.
 * @return {object} { `results`, `hits`, `hasNext`, and `session` }
 */
async function handleSearch(url, session) {
  const results = [];

  const searchParams = new URLSearchParams();
  searchParams.set("query", url);
  searchParams.set("sort", "top");
  // Use 'session' to pass context between function calls
  if ({}.hasOwnProperty.call(session, "page")) {
    searchParams.set("page", session.page + 1);
  }

  // Call the search API with a timeout
  // const response = await FETCH
  //   .get("https://www.example.com/api/search", {
  //     searchParams,
  //     timeout: 10000, // 10s
  //   });

  const response = {
    itemCount: 2,
    page: 1,
    pageCount: 1,
    items: [
      {
        id: "tetetoto",
        title: "Tete Toto",
        permalink: "https://example.com/tetetoto_thread",
        url: "https://example.com/tetetoto",
        comments: 12,
        created: "Today",
      },
      {
        id: "hogehoge",
        title: "Hoge Hoge",
        permalink: "https://example.com/hogehoge_thread",
        url: "https://example.com/hogehoge",
        comments: 42,
        created: "Now",
      },
    ],
  };

  const { items } = response;
  // Loop through the response, creating results
  for (let idx = 0; idx < items.length; idx += 1) {
    const result = items[idx];
    results.push({
      id: items.id,
      thread: {
        title: result.title,
        url: result.permalink,
      },
      url: result.url,
      meta: [
        {
          item: "comments",
          text: `${result.comments} comments`,
        },
        {
          item: "created",
          text: `submitted ${result.created}`,
        },
      ],
    });
  }

  return {
    results, // list
    hits: response.itemCount, // string
    hasNext: response.page < response.pageCount, // boolean
    session: {
      page: response.page,
    }, // object
  };
}

// Export the source name, and search function
export default {
  name: "Sample",
  handleSearch,
};
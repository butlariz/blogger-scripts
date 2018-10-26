const createSummaryPost = (id, url, numComments) => {
  const postID = String(id)
  const divItem = $(`#post-body-${postID}`);
  const postTitle = $(`#post-body-${postID} .post-title`).text();
  const postImg = $(`#post-body-${postID}  img`)[1].src; //adicionar class no post;
  const comments = numComments;
  const postText = $(`#post-body-${postID} .post-main`).text();
  const summaryText = postText.substring(0, 400) + "...";

  const template = `
  <div class='summary-body'>
        <div class='summary-thumb'>
          <a href='${url}'><img src='${postImg}'/></a>
        </div>
        <div class='summary-text'>
        <a href='${url}'><h2> ${postTitle} </h2></a>
        <div class='sumary-content'> ${summaryText} </div>
        <div class='summary-footer'> <img src='https://i.imgur.com/w9wT980.png?1'/> ${comments} &#8226; <a href='${url}'> Continue lendo </a></div>
        </div>
  </div>
  ` 
  divItem.html(template);
}

function clsLatestPosts(root) {
  const entries = root.feed.entry || [];
  entries.map(function (value) {
    //variables data
    let post = value;
    let postTitle = post.title.$t;
    let postCategory = post.category[0].term;

    let links = post.link || [];
    for (var j in links) {
      if (links[j].rel == "alternate") break;
    }
    let postUrl = links[j].href;
    let orgImgUrl = post.media$thumbnail ? post.media$thumbnail.url :"http://2.bp.blogspot.com/-OSlo4lj_H4w/VRMrRXuZWyI/AAAAAAABCNA/RQsmcuaWiEE/s1600/sem.gif";
    let imgUrl = orgImgUrl.replace("s72-c", "s" + 430 + "-c");

    let templateItem = `
    <div class='latest-item'>
      <a href='${postUrl}'>
        <div class='latest-clsthumb'> <img src='${imgUrl}'/> </div>
        <div class='latest-clstext'>
    <span class='latest-clscategory'> ${postCategory} </span>
        <span class='latest-clstitle'> ${postTitle} </span>
    </div>
      </a>
    </div>
  `
    $("#cls-latest-post").append(templateItem);
  });
}

function clsRelatedPosts(root) {
  const divRelated = $("#cls-relatedpost");
  const entry = root.feed.entry || [];
  entry.map(function (value) {
    if (divRelated.children().length < 3) {
      //variables data
      let post = value;
      let postTitle = post.title.$t;
      let links = post.link || [];
      for (var j in links) {
        if (links[j].rel == "alternate") break;
      }
      let postUrl = links[j].href;
      if (window.location.href !== postUrl) {
        let orgImgUrl = post.media$thumbnail ? post.media$thumbnail.url :"http://2.bp.blogspot.com/-OSlo4lj_H4w/VRMrRXuZWyI/AAAAAAABCNA/RQsmcuaWiEE/s1600/sem.gif";
        let imgUrl = orgImgUrl.replace("s72-c", "s" + 430 + "-c");

        let templateItem = `
        <div class='related-item'>
          <a href='${postUrl}'>
            <div class='related-clsthumb'> <img src='${imgUrl}'/> </div>
            <div class='related-clstext'>
             <span class='related-clstitle'> ${postTitle} </span>
            </div>
           </a>
        </div>
        `
        divRelated.append(templateItem);
      }
    }
  });
}

let allData;
let catagoryname;
const loadCatagory=()=>{
    const url=`https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayCatagory(data.data.news_category));
}

// display catagory function
const displayCatagory=(catagories)=>{
    const div=document.getElementById("ul-list");
    catagories.forEach(catagory => {
    //   console.log(catagory.category_name);
    //   console.log(catagory.category_id);
      const ul=document.createElement("ul");
      ul.innerHTML=`
      <li class="text-2xl hover:bg-violet-500 hover:text-white hover:p-2" ><a onclick="catagoryDetails('${catagory.category_id}','${catagory.category_name}')"> 
       ${catagory.category_name}</a></li>
      `;
      div.appendChild(ul);
  });
}

const catagoryDetails=(catagoryId,name)=>{
const url=`https://openapi.programming-hero.com/api/news/category/${catagoryId}`;
fetch(url)
.then(res=>res.json())
.then(data=>{
    allData=data.data;
    catagoryname=name;
    showCatagoryDetails(data.data,name)});
}

const showCatagoryDetails=(datas,name)=>{
 
 const card=document.getElementById("card");
//  console.log(name);
//  console.log(datas.length);
 document.getElementById("no").innerHTML=`
 <span id="no">${datas.length}</span> items found for <span id="catagory">${name}</span></h2>
 `;
 const cardContainer=document.getElementById("card");
 cardContainer.innerHTML="";
   datas.forEach(data=>{

    console.log(data._id);
    // console.log(datas[0].author.img);
    // console.log(datas[0].author.name);
    // console.log(datas[0].author.published_date);
    // console.log(datas[0].details.slice(0,50));
    // console.log(datas[0].image_url);
    // console.log(datas[0].total_view);
    // console.log(datas[0].title);
    const div=document.createElement("div");
    div.innerHTML=`
    <div class="card p-3 mb-4 card-side bg-base-100 shadow-xl">
    <figure><img src="${data.image_url}" class="w-[200px]" alt="Movie"/></figure>
    <div class="card-body  ">
      <h2 class="card-title">${data.title}</h2>
      <p>${data.details.slice(0,50)}</p>
      <div class="card-actions flex items-center justify-between ">
       <div class="flex gap-2 items-center">
        <img src="${data.author.img?data.author.img : 'not avaialable'}" class="w-10 rounded-full" alt="">
        <div>
            <h2>${data.author.name? data.author.name : 'not avaialable'}</h2>
            <h2>${data.author.published_date?data.author.published_date : 'not avaialable'}</h2>
        </div>
       </div>
       <div class="flex items-center gap-2 ">
        <i class="fa-solid fa-eye text-2xl text-violet-400"></i>
        <h2 class="text-lg">${data.total_view?data.total_view : 0}</h2>
       </div>
       <div class="flex items-center gap-2">
        <i class="fa-solid fa-star text-violet-400"></i>
        <i class="fa-solid fa-star text-violet-400"></i>
        <i class="fa-solid fa-star text-violet-400"></i>
        <i class="fa-solid fa-star text-violet-400"></i>
       </div>
       <div>
        <label for="my-modal-5" onclick="details('${data._id}')" class="btn bg-white"><i class="fa-solid fa-arrow-right text-2xl text-violet-400" ></i>
        </lebel>
       </div>
      </div>
    </div>
  </div>
    `;
   cardContainer.appendChild(div);
})
}


const details=(catagoryId)=>{
const url=`https://openapi.programming-hero.com/api/news/${catagoryId}`;
fetch(url)
.then(res=>res.json())
.then(data=>showDetails(data.data[0]));
}

const showDetails=(data)=>{
 console.log(data.author.name);
  console.log(data.author.published_date);
    console.log(data.details.slice(0,50));
    console.log(data.image_url);
    console.log(data.title);
    console.log(data.others_info.is_trending);
  document.getElementById("title").innerText=data.title;
  document.getElementById("badge").innerText=data.others_info.is_trending?"Trending": "Not Trending ";
  document.getElementById("details").innerText=data.details.slice(0,250);
  document.getElementById("image").src=data.image_url;

}

// sorting
const select=()=>{
const selectValue= document.getElementById("select").value;
console.log(allData);
if(selectValue==="Ascending"){
const ac=allData.sort((a,b)=>a.total_view-b.total_view);
showCatagoryDetails(ac,catagoryname);
}
else{
    const ac=allData.sort((a,b)=>b.total_view-a.total_view);
    showCatagoryDetails(ac,catagoryname);
}
 
}



// trending
const trending=()=>{
    // console.log(allData);
   const trendingData= allData.filter((data)=>{
    //   console.log(data.others_info.is_trending);
    return data.others_info.is_trending===true;
    })
   console.log(trendingData);
   showCatagoryDetails(trendingData,catagoryname);
    }

// new 
const news=()=>{
    console.log(allData);
   const newData= allData.filter((data)=>{
    //   console.log(data.others_info.is_todays_pick);
    return data.others_info.is_todays_pick===true;
    })
   console.log(newData);
   showCatagoryDetails(newData,catagoryname);
    }










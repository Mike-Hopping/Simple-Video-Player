// var youtubeData = {
//     "videos": ['9XVasMSJSoU', 'Di7RvMlk9io', 'EtQ8Le8-zyo', 'sZWMPYIkNd8', '0ueamFGdOpA']
// };

// Once all HTML has loaded
$(function(){
    
    // video List
    var videos = null;
    
    var categories = null;
    //Find DOM elements
    
    var videoList = $('.video-list'),
        categoryList = $('.category-list'),
        searchbox = $('#searchbox'),
        player =$('#player')
        screenLinks =$('.screenLink');
        screens =$('.screen');
        
        function init(){
            // get videos from json file
            $.getJSON('json/videos.json', function(data){
                videos = data.videos;
                displayVideos(videos);
            });
            $.getJSON('json/categories.json', function(data){
                categories = data.categories;
                displayCategories(categories);
            });
            searchbox.on('keyup', function (evt) {
                evt.preventDefault(); 
                if(evt.which === 13){
                    var video = getVideoByID($(this).val());
                    if (video){
                        displayVideos([video]);
                    }else{
                        displayVideosByTitle($(this).val());
                    }
                }
            });
    

            $.each(screenLinks, function(i, link){
                $(this).on('click', changeScreen);
            });

            screens.eq(1).hide();
            }
    /**
     * @param  {} searchbox
     * Search videos by ID
     */
    function getVideoByID(inputValue){
        // Find out if ID exists in DB
        // $.each(videos, function(i, video){
        //     var id = video.id;
            // if(id === inputValue || video.title === inputValue){
            // if(id === inputValue){
            //     return video;
            // }
        // });

        // Find out if ID exists in DB

        for (var i = 0; i < videos.length; i++){
            var id = videos[i].id;
            if (id === inputValue) {
                return videos[i];
            }
        }
            return null;
        }

        
        // if(videos.indexOf(inputValue) !== -1){
            // Found Id in DB	
        // }
    // }
    /**
     * @param  {} video
     * Display Video and Titles
     */
    
    function getHTMLVideoItem(video) {
        return `<div data-id="${video.id}" class="video-list--item" style="background-image:url(http://i3.ytimg.com/vi/${video.id}/maxresdefault.jpg); background-size:cover; background-position:center center">
                <div class="video-list--title">
                    <p>${video.title}</p>
                </div>
                </div>`;
    }
    function getHTMLCategoryItem(category){
        return `<li data-category="${category.slug}" class="category-list--item">
        ${category.title}
    </li>`;
        }
    
    // loop through and display
    function displayVideos(videos) {
        // jQuery loop
        var s = " ";
        $.each(videos, function (i, video) {
            s += getHTMLVideoItem(video);
        });
        // set innerHTML of video list container with items
        videoList.html(s);
        // target the videos
        var videos = $(".video-list--item");
        // loop through and add click event
        $.each(videos, function (i, video) {
            $(this).on("click", function () {
                playVideo($(this));
            });
        });
    
    }
    
    function displayVideosByCategory(category){
        var filteredVideos = [];
        $.each(videos, function (i, video) {
            if(video.category === category){
                filteredVideos.push(video);
            }
        });
    
    displayVideos(filteredVideos);
    }
    // Display Videos By Title
    function displayVideosByTitle(title){
        var filteredVideos = [];
        $.each(videos, function (i, video) {
            if(video.title.includes(title)){
                filteredVideos.push(video);
            }
        });
    
    displayVideos(filteredVideos);
    }
    
    // Loop through and display
    function displayCategories(categories){
        var s = '';
        $.each(categories, function(i, category){
            s = s + getHTMLCategoryItem(category);
        });
        
        // Set inner HTML of video container with items
        categoryList.html(s);
        // target the videos
        var categories = $('.category-list--item');
        // loop through and add click event listeners
        $.each(categories, function(i, category){
            $(this).on('click', function(){
                var category = $(this).data('category');
                displayVideosByCategory(category);
            });
        });
    }
    
    
    
    function playVideo(listItem){
        var videoId = listItem.data('id');
        player.attr('src', 'http://www.youtube.com/embed/' + videoId + '?autoplay=1');
    }
    
    // Change the screen

    function changeScreen(){
        $.each(screenLinks, function(i, link){
            $(this).removeClass('active');
        });
        
        $(this).addClass('active');
        
        var screenName = $(this).data('screen');


        $.each(screens, function(i, screen){
            $(this).hide();
        });
       
        $('#' + screenName).show();
    }

    init();
    });
    
    
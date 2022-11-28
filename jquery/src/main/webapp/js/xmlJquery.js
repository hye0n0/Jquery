/**
 * 
 */

$.ajax({
    url: './cd_catalog.xml',
    success: function(doc) {
        console.log(doc);
        // table, thead, tbody => show의 하위요소
        let tbody = $('<tbody />');
        $(doc).find('CD').each(function(prop, cd){
            let tr = $('<tr />');
            $(cd).children().each(function(prop, item) {
                $(tr).append($('<td />').text($(item).text()));
            })
            $(tbody).append(tr);
        })
        let tr = $('<tr />');
        $(doc).find('CD').eq(0).children().each(function(prop, title){
            $(tr).append($('<th />').text(title.nodeName));
        })
        let thead = $('<thead />').append($(tr));
        $('#show').append($('<table />').append($(thead),$(tbody)));
    },
    error: function(error){
        console.log(error);
    }
})
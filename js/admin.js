//打开后台页面时，发送请求，刷新新闻列表
$(document).ready(function() {
    var $newsTable = $('#newstable tbody');
    refreshNews();

    //添加新闻
    $('#btnsubmit').click(function(e) {
        e.preventDefault();
        //点击时的输入判断
        if ($('#newstitle').val() === "" || $('#newscontents').val() === "" || $('#newsimg').val() === "" || $('#newstime').val() === "") {
            if ($('#newstitle').val() === "") {
                $('#newstitle').parent().addClass('has-error');
            } else {
                $('#newstitle').parent().removeClass('has-error');
            }
            if ($('#newscontents').val() === "") {
                $('#newscontents').parent().addClass('has-error');
            } else {
                $('#newscontents').parent().removeClass('has-error');
            }
            if ($('#newsimg').val() === "") {
                $('#newsimg').parent().addClass('has-error');
            } else {
                $('#newsimg').parent().removeClass('has-error');
            }
            if ($('#newstime').val() === "") {
                $('#newstime').parent().addClass('has-error');
            } else {
                $('#newstime').parent().removeClass('has-error');
            }
        } else {
            //提交添加
            var jsonNews = {
                newstitle: $('#newstitle').val(),
                newstype: $('#newstype').val(),
                newscontents: $('#newscontents').val(),
                newsimg: $('#newsimg').val(),
                newstime: $('#newstime').val()
            };
            $.ajax({
                url: 'server/inset.php',
                type: 'post',
                data: jsonNews,
                datatype: 'json',
                success: function(data) {
                    // console.log(data);
                    alert('添加成功');
                    refreshNews();
                }
            });
        };

    });

    //删除新闻
    var deleteId = null;
    $newsTable.on('click', '.btn-danger', function(e) {
        $('#deleteModal').modal('show');
        deleteId = $(this).parent().prevAll().eq(3).html();
    });
    $('#deleteModal #confirmDelete').click(function(e) {
        if (deleteId) {
            $.ajax({
                url: 'server/delete.php',
                type: 'post',
                data: { newsid: deleteId },
                success: function(data) {
                    // console.log('删除成功');
                    $('#deleteModal').modal('hide');
                    refreshNews();
                }
            });
        }
    })

    //修改新闻
    var updateId = null;
    $newsTable.on('click', '.btn-primary', function(e) {
        $('#updateModal').modal('show');
        updateId = $(this).parent().prevAll().eq(3).html();
        $.ajax({
            url: 'server/edit.php',
            type: 'get',
            datatype: 'json',
            data: { newsid: updateId },
            success: function(data) {
                // console.log(data);
                $('#unewstitle').val(data[0].newstitle);
                $('#unewstype').val(data[0].newstype);
                $('#unewscontents').val(data[0].newscontents);
                $('#unewsimg').val(data[0].newsimg);
                var utime = data[0].newstime.split(' ')[0];
                // console.log(utime);
                $('#unewstime').val(utime);
            }
        });
    });
    $('#updateModal #confirmUpdate').click(function(e) {
        $.ajax({
            url: 'server/update.php',
            type: 'post',
            data: {
                newstitle: $('#unewstitle').val(),
                newstype: $('#unewstype').val(),
                newscontents: $('#unewscontents').val(),
                newsimg: $('#unewsimg').val(),
                newstime: $('#unewstime').val(),
                id: updateId
            },
            success: function(data) {
                // console.log('ok');
                $('#updateModal').modal('hide');
                refreshNews();
            }
        });
    });

    //刷新新闻列表
    function refreshNews() {
        //empty table
        $newsTable.empty();
        $.ajax({
            url: 'server/getnews.php',
            type: 'get',
            datatype: 'json',
            success: function(data) {
                // console.log(data);
                data.forEach(function(item, index, array) {
                    var $tdid = $('<td>').html(item.id);
                    var $tdtitle = $('<td>').html(item.newstitle);
                    var $tdtype = $('<td>').html(item.newstype);
                    var $tdtime = $('<td>').html(item.newstime);
                    var $tdcontrol = $('<td>');
                    var $btnedit = $('<button>').addClass('btn btn-primary btn-xs').html('修改');
                    var $btndelete = $('<button>').addClass('btn btn-danger btn-xs').html('删除');
                    $tdcontrol.append($btnedit, $btndelete);
                    var $tRow = $('<tr>');
                    $tRow.append($tdid, $tdtitle, $tdtype, $tdtime, $tdcontrol);
                    $newsTable.append($tRow);
                });
            }
        });
    };
});

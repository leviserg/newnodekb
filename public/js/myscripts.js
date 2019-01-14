$(document).ready(()=>{
    $('.del-dev').on('click', (e)=>{
        $target = $(e.target);
        const id = $target.attr('data-id');
        if (confirm('Are you sure?')){
            $.ajax({
                type:'DELETE',
                url:'/device/'+id,
                success: ()=>{
                    alert('Deleting Device');
                    window.location.href='/';
                },
                error: (err)=>{
                    console.log(err);
                }
            });
        }
    });
    
    $('#LoginBtnId').on('click', (e)=>{
        $('#LoginModal').modal("show");
    });

    $('#LoginLinkId').on('click', (e)=>{
        $('#LoginModal').modal("show");
    });

    $('.edit-dev').on('click', (e)=>{
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type:'GET',
            url:'/device/modal/'+id,
            success: (data)=>{
                let selDevice = data.showDevice;
                let Protocols = data.protocols;
                $('#EditModal').modal("show");
                var form = $("form[name='ModForm']");
                form.attr('action', '/device/' + selDevice._id);
                $('#ModDevTitle').html(selDevice.title);
                document.getElementById('ModEditTitle').value = selDevice.title;
                document.getElementById('ModEditDescription').value = selDevice.description; 
                $("select[name='protocol']").empty();
                $("select[name='protocol']").append('<option value="' + selDevice.protocol._id + '">'+ selDevice.protocol.name + '. ' + selDevice.protocol.layer + '</option>');	
                for(let i = 0; i < Protocols.length; i++){
                    $("select[name='protocol']").append("<option value="+Protocols[i]._id+">"+Protocols[i].name + '. ' + Protocols[i].layer +"</option>");
                }
                $('#ModDelBtn').attr('data-id', selDevice._id);
            },
            error: (err)=>{
                console.log(err);
            }
        });
    });

});


/** @jsx React.DOM */

var MyCustomTagManager = React.createClass({
                
    addTagCallback: function(tagName, setStateCallback){
        alert('Add a tag! Maybe you should send an ajax!');
        setStateCallback({id: 99, name: tagName});
        /*
        $.ajax({
            url: "/tag/add",
            method: 'post',
            data: { name: tagName },
            success: function(res){
                setStateCallback(res.tag);
            }
        });
        */    
    },

    removeTagCallback: function(tag){
        alert('Remove a tag! Maybe you should send an ajax!');
        /*
        $.ajax({
            url: "/tag/remove",
            method: 'delete',
            data: { id: tag.id },
        });            
        */
    },
                
    render: function(){
        return(
            <TagManager {...this.props} addTagCallback={this.addTagCallback} removeTagCallback={this.removeTagCallback} />
        )
    }

});            

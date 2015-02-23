/** @jsx React.DOM */

        var TagOption = React.createClass({
            
            onClick: function(){
                this.props.addTag(this.props.value);
                this.props.closeInput();
            },
                        
            render: function(){
                return (
                    <p className='react-tag-option' onClick={this.onClick}>
                        {this.props.value}
                    </p>
                );
            }            
        });

        var AddTagComponent = React.createClass({
                                    
            componentDidMount: function(){
                document.addEventListener("keydown", function (e) {
                    if ( (this.props.showInput) && (e.keyCode === 27) ){
                        this.props.closeInput();
                    }
                }.bind(this));
                
                document.addEventListener("click", function (e) {
                    if( this.props.showInput && (e.target !== this.refs.input.getDOMNode()) ){
                        this.props.closeInput();
                    }
                }.bind(this));
                
            },
            
            componentDidUpdate: function(){                
                if (this.props.showInput){
                    this.refs.input.getDOMNode().focus();
                }                
            },
            
            onKeyDown: function(e){
                if (e.keyCode === 13){
                    if (this.refs.input.getDOMNode().value === ''){

                    } else {
                        this.props.addTag(this.refs.input.getDOMNode().value);
                        this.refs.input.getDOMNode().value = '';
                        this.props.closeInput();
                    }
                }
            },
            
            onClickButton: function(e){
                // Using stopImmediatePropagation rather than stopPropagation is kind of ugly.
                // But since the current button is disappearing at the same time, it's not easy
                // to figure out which element is the parent element.

                e.nativeEvent.stopImmediatePropagation();                
                this.props.openInput();
            },
            
            render: function(){
                
                if (this.props.showInput){
                    var tagOptions = [];
                    for(var i in this.props.tagOptions){
                        tagOptions.push(<TagOption value={this.props.tagOptions[i]} addTag={this.props.addTag} closeInput={this.props.closeInput} />);
                    }
                                        
                    return (
                        <div className='react-tag-add-component'>
                            <input className='react-tag-add-input' ref='input' type='text' onKeyDown={this.onKeyDown} onChange={this.props.changeInput} />
                            <div className='react-tag-option-container'>
                                {tagOptions}
                            </div>
                        </div>
                    );
                } else {
                    return (<button onClick={this.onClickButton}>+</button>);
                }
                
            }
            
        });
        
        var Tag = React.createClass({
                        
            onClick: function(){
                this.props.removeTag(this.props.index);
            },
            
            render: function(){
                return (
                    <span className='react-tag' onClick={this.onClick}>
                        {this.props.name}
                    </span>
                );
            }
            
        });
        
        var TagList = React.createClass({
            render: function(){
                var tags= [];
                for(var i in this.props.tags){
                    tags.push( <Tag index={i} name={this.props.tags[i].name} removeTag={this.props.removeTag} /> );
                }
                
                return(
                    <span>
                        {tags}
                    </span>
                )
            }
        });

        var TagManager = React.createClass({
            
            getInitialState: function(){
                if (this.props.tags){
                    return { showInput: false, currentInput: '', tags: this.props.tags };                
                } else {
                    return { showInput: false, currentInput: '', tags: [] };                
                }
            },
            
            getDefaultProps: function() {
                return {
                    tagOptions: []
                };
            },
            
            openInput: function(){
                this.setState({ showInput: true });
            },

            closeInput: function(){
                this.setState({ showInput: false });
            },
            
            addTag: function(name){

                if (this.props.addTagCallback) {
                    this.props.addTagCallback(name, function(tag){
                        var tags = this.state.tags;
                        tags.push(tag);
                        this.setState({tags: tags});                
                    }.bind(this));
                } else {
                    var tags = this.state.tags;
                    tags.push({name: name});
                    this.setState({tags: tags});                                
                }
            },
            
            removeTag: function(index){
                var tags = this.state.tags;
                this.props.removeTagCallback && this.props.removeTagCallback(tags[index]);
                tags.splice(index, 1);
                this.setState({tags: tags});
            },
            
            changeInput: function(e){
                this.setState({currentInput: e.target.value});
            },
            
            getTagOptions: function(){
                var result = [];

                for (var j=0; j<this.props.tagOptions.length; j++) {
                    if (this.props.tagOptions[j].match(this.state.currentInput)) result.push(this.props.tagOptions[j]);
                }
                
                return result;
            },
            
            render: function(){
                return(
                    <div >
                        <TagList tags={this.state.tags} removeTag={this.removeTag} />
                        <AddTagComponent 
                        showInput={this.state.showInput} 
                        openInput={this.openInput} 
                        closeInput={this.closeInput} 
                        changeInput={this.changeInput}
                        addTag={this.addTag}
                        tagOptions={this.getTagOptions()}
                    />
                    </div>
                )
            }
        });            

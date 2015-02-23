# React Tag Manager
React Tag Manager is a React plugin for implementing tagging system easily with React.

# Features
* Autocomplete
* Dynamic creating/deleting

# Demo
http://howtomakeaturn.github.io/react-tag-manager/

# Getting Started
To use the tag manager plugin, include the react library, the JSX transformer, and the react-tag-manager library inside the tag of your HTML document:

```html
<head>
  <script src='//cdnjs.cloudflare.com/ajax/libs/react/0.12.0/JSXTransformer.js'></script>
  <script src='//cdnjs.cloudflare.com/ajax/libs/react/0.12.0/react.js'></script>
  <script type="text/jsx" src='tag-manager.jsx'></script>    
  <link rel="stylesheet" href="tag-manager.css">
</head>
```

Tell tag manager what's the initial tags and options for autocomplete:
```jsx
<script type="text/jsx">
    /** @jsx React.DOM */
    var tags = [
        { name: 'Jack', id: 1},
        { name: 'Betty', id: 2},
        { name: 'Kelly', id: 3},
    ];
    
    var tagOptions = [
        'apple',
        'banana',
        'cat'
    ];

    React.renderComponent( 
        <TagManager tags={tags} tagOptions={tagOptions} />, 
        document.getElementById('simple-tag-manager') 
    );
</script>
```
We done! The live demo is here: [Basic example](http://howtomakeaturn.github.io/react-tag-manager/)

# Advanced

Usually you need to send an ajax or do some other things after user creating/deleting tags. Tag manager support this with callback functions in composition components.

Simply create your own component with callback functions for creating/deleting, and then render TagManager with  [JSX spread attributes](http://facebook.github.io/react/docs/jsx-spread.html).

```jsx
/** @jsx React.DOM */

var MyCustomTagManager = React.createClass({
                
    addTagCallback: function(tagName, setStateCallback){
        alert('Add a tag! Maybe you should send an ajax!');
        setStateCallback({id: 99, name: tagName});
    },

    removeTagCallback: function(tag){
        alert('Remove a tag! Maybe you should send an ajax!');
    },
                
    render: function(){
        return(
            <TagManager {...this.props} addTagCallback={this.addTagCallback} removeTagCallback={this.removeTagCallback} />
        )
    }

});            

```
To render the customized tag manager, it's the same as the original one:
```jsx
/** @jsx React.DOM */

var tags = [
    { name: 'Jack', id: 1},
    { name: 'Betty', id: 2},
    { name: 'Kelly', id: 3},
];

var tagOptions = [
    'apple',
    'banana',
    'cat'
];

React.renderComponent(
    <MyCustomTagManager tags={tags} tagOptions={tagOptions} />, 
    document.getElementById('advanced-tag-manager') 
);
```


The live demo is here: [Custom tag manager example](http://howtomakeaturn.github.io/react-tag-manager/)

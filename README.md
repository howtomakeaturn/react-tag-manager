# React Tag Manager
React Tag Manager is a React plugin for implementing tagging system easily with React.

# Features
* Autocomplete
* Dynamic creating/deleting

# Demo
http://howtomakeaturn.github.io/react-tag-manager/

# Getting Started
To use the tag manager plugin, include the react library, the JSX transformer, and the react-tag-manager library inside the tag of your HTML document:

'''
<hea>
  <script src='//cdnjs.cloudflare.com/ajax/libs/react/0.12.0/JSXTransformer.js'></script>
  <script src='//cdnjs.cloudflare.com/ajax/libs/react/0.12.0/react.js'></script>
  <script type="text/jsx" src='tag-manager.jsx'></script>    
  <link rel="stylesheet" href="tag-manager.css">
</head>
'''

Tell tag manager what's the initial tags and options for autocomplete:
'''
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
'''
We done! The live demo is here: [Basic example](http://howtomakeaturn.github.io/react-tag-manager/)

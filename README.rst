beamdocs
========

escript that parses OTP docs from xml files and generates multiple output
types (markdown, html focus for now).

It does it by using xmerl to parse the xml, then to transform the xml record
into erlang data structures (erldata), then to an "abstract format tree", that
is a data structure that describes semantic parts of the documentation, from
there the different "emitters" can generate the final format, markdown uses
prettypr to create a document and then format it.

so the stages are:

* xml text
* xml data (xmerl record)
* erlang data (erldata)
* erlang "abstract format tree" (aft)

and then for markdown:

* prettypr tree
* md text

you can dump the intermediate representations with the right command.

Note: for now it explicitly ignores big files like book, ref_man, part and some
heavy pages like wx/gl.

Quickstart
----------

HTML
....

::

   export CODE_PATH=path/to/erlang/otp/
   make html

Check the content in `docs/html/`

Markdown
........

For this you need to have http://mkdocs.org installed (on ubuntu it's `sudo apt install mkdocs`) and then run::

   export CODE_PATH=path/to/erlang/otp/
   make mkdocs
   make mkdocs-serve

Check the content in the `mkdocs-site/site` folder or http://localhost:8000/

Build
-----

::

    rebar3 escriptize

or::

    make

License
-------

MIT

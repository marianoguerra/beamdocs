beamdocs
========

escript to generate a json file with module info for each erl file found
and then generate an index to make it easy to search functions.

Build
-----

::

    rebar3 escriptize

or::

    make

Translate OTP XML docs to restructured text (experimental), first you need to build the docs, so it generates the dynamic XML files (follow instructions here http://marianoguerra.org/posts/improving-official-erlang-documentation/), then::

    CODE_PATH=$HOME/src/erl/otp/
    mkdir -p rst-docs
    ./_build/default/bin/beamdocs docs-to-rst $CODE_PATH rst-docs

Generate index::

    cp tools/index.head.rst rst-docs/index.rst
    cd rst-docs
    for i in */book.rst; do echo "   $i" >> index.rst; done
    cd ..

Run
---

::

    CODE_PATH=$HOME/src/erl/otp
    ./_build/default/bin/beamdocs to-json $CODE_PATH ./out

clean up the out folder to leave only the ones you want and then generate the
index::

    CODE_PATH=$HOME/src/erl/otp
    COMMIT=$(cd $CODE_PATH && git rev-parse HEAD)
    SOURCE_URL="https://github.com/erlang/otp/tree/%COMMIT%/%SOURCE_PATH%#L%LINE%"
    ./_build/default/bin/beamdocs to-index ./out ./data/index.json $SOURCE_URL $COMMIT

Example for cowboy::

    CODE_PATH=$HOME/soft/cowboy
    rm -rf out
    ./_build/default/bin/beamdocs to-json $CODE_PATH ./out
    COMMIT=$(cd $CODE_PATH && git rev-parse HEAD)
    SOURCE_URL="https://git.ninenines.eu/cowboy.git/tree/%SOURCE_PATH%?id=%COMMIT%#n%LINE%"
    ./_build/default/bin/beamdocs to-index ./out ./data/cowboy.json $SOURCE_URL $COMMIT

Generate JSON from xml otp docs
-------------------------------

::

    for i in $(ls -d path-to-otp-src/lib/*/doc/src/); do ./_build/default/bin/beamdocs docs-to-json $i out; done

Use in your Projects
--------------------

You can use it for your project simply by changing CODE_PATH, COMMIT and SOURCE_URL
and copying index.html js/app.js css/style.css data/index.json and customizing
it to your needs.

in the source url string the following placeholders will be replaced when
building the url to open the source code:

* %COMMIT%: the commit hash passed as last parameter to to-index
* %SOURCE_PATH%: the path to the source file inside the base directory
* %LINE%: the line where the function is defined

Web UI
------

Check gh-pages branch or https://marianoguerra.github.io/beamdocs/ for a simple
search UI.

License
-------

MIT

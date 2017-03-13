beamdocs
========

An escript to generate a json file with module info for each erl file found
and then generate an index to make it easy to search functions.

Build
-----

::

    rebar3 escriptize

Run
---

::

    CODE_PATH=$HOME/src/erl/otp
    ./_build/default/bin/beamdocs to-json $CODE_PATH ./out

clean up the out folder to leave only the ones you want and then generate the
index::

    CODE_PATH=$HOME/src/erl/otp
    ./_build/default/bin/beamdocs to-index ./out ./data/index.json https://github.com/erlang/otp/tree/ $(cd $CODE_PATH && git rev-parse HEAD)

Web UI
------

Check gh-pages branch or https://marianoguerra.github.io/beamdocs/ for a simple
search UI.

License
-------

MIT

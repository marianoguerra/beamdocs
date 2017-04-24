#!/usr/bin/env bash

set -e

BASE_DIR=$HOME/.kerl/builds/19.3/otp_src_19.3/

rm -rf out

for app in asn1 common_test compiler crypto debugger dialyzer diameter edoc eldap erl_docgen erl_interface et eunit gs hipe ic inets jinterface kernel mnesia observer odbc orber os_mon otp_mibs parsetools percept public_key reltool runtime_tools sasl snmp ssh ssl stdlib syntax_tools tools typer wx xmerl; do ./_build/default/bin/beamdocs docs-to-rst $BASE_DIR/lib/$app/doc/src/ out/$app; done

./_build/default/bin/beamdocs docs-to-rst $BASE_DIR/erts/doc/src/ out/erts

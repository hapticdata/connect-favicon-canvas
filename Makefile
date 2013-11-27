REPORTER ?= list

test:
	./node_modules/mocha/bin/mocha --reporter $(REPORTER) test/*

.PHONY: test
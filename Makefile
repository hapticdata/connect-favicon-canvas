REPORTER ?= list

test:
	mocha --reporter $(REPORTER) test/*

.PHONY: test
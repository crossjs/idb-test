import "regenerator-runtime";
import { expect } from "chai";
import { get, set, del, clear, keys } from "idb-keyval";
import bigKey from "./big-key";
import bigValue from "./big-value";

beforeEach(() => {
  clear();
});

describe("basic", () => {
  describe("get", async () => {
    it("undefined", async () => {
      expect(await get("foo")).to.equal(undefined);
    });
  });

  describe("set", () => {
    it("string", async () => {
      await set("foo", "bar");
      expect(await get("foo")).to.equal("bar");
    });

    it("number", async () => {
      await set("foo", 1);
      expect(await get("foo")).to.equal(1);
    });

    it("boolean", async () => {
      await set("foo", true);
      expect(await get("foo")).to.equal(true);
      await set("foo", false);
      expect(await get("foo")).to.equal(false);
    });

    it("array", async () => {
      await set("foo", ["bar"]);
      expect(await get("foo")).to.deep.equal(["bar"]);
    });

    it("object", async () => {
      await set("foo", { bar: "baz" });
      expect(await get("foo")).to.deep.equal({ bar: "baz" });
    });
  });

  describe("del", async () => {
    it("undefined", async () => {
      await del("foo");
      expect(await get("foo")).to.equal(undefined);
    });
    it("defined", async () => {
      await set("foo", "bar");
      expect(await get("foo")).to.equal("bar");
      await del("foo");
      expect(await get("foo")).to.equal(undefined);
    });
  });

  describe("clear", async () => {
    it("default", async () => {
      await set("foo", "bar");
      expect(await get("foo")).to.equal("bar");
      await clear();
      expect(await get("foo")).to.equal(undefined);
    });
  });

  describe("keys", async () => {
    it("default", async () => {
      expect((await keys()).length).to.equal(0);
      await set("foo", "bar");
      await set("baz", 1);
      expect((await keys()).length).to.equal(2);
    });
  });
});

describe("big data", () => {
  it("big key", async () => {
    await set(bigKey, "bar");
    expect(await get(bigKey)).to.equal("bar");
  });

  it("big value", async () => {
    await set("foo", bigValue);
    expect(await get("foo")).to.deep.equal(bigValue);
  });

  it("big value: 10 times", async () => {
    for (let i = 0; i < 10; i++) {
      await set(`foo.${i}`, bigValue);
      expect(await get(`foo.${i}`)).to.deep.equal(bigValue);
    }
  });

  it("big value: 100 times", async () => {
    for (let i = 0; i < 100; i++) {
      await set(`foo.${i}`, bigValue);
      expect(await get(`foo.${i}`)).to.deep.equal(bigValue);
    }
  });

  it("big value: 1000 times", async () => {
    for (let i = 0; i < 1000; i++) {
      await set(`foo.${i}`, bigValue);
      expect(await get(`foo.${i}`)).to.deep.equal(bigValue);
    }
  });
});

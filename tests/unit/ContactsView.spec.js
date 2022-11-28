import Card from "@/views/Card.vue";
import ContactsView from "@/views/ContactsView.vue";
import { mount } from "@vue/test-utils";

describe("Card.vue", () => {
  it("renders slots when passed", () => {
    const content = "<span>Content</span>";
    const title = "<span>Title</span>";

    const wrapper = mount(Card, {
      slots: {
        default: content,
        title: title,
      },
    });

    expect(wrapper.html()).toMatch(title);
    expect(wrapper.html()).toMatch(content);
  });
});

describe("ContactsView.vue", () => {
  it("renders slots when passed", () => {
    const wrapper = mount(ContactsView);
  });
});

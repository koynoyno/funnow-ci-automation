# Note: active bugs on web. These test are expected to fail until the bugs are fixed.
# These tests aren't using page objects for the sake of simplicity.

import pytest
from playwright.sync_api import expect, Page

@pytest.mark.xfail()
def test_category_button_is_visible_after_selecting_a_category(set_up: Page):
  """BUG 'Category' button is not visible after selecting a category"""

  page = set_up
  page.goto('/regions/1/search')
  page.get_by_role('button', name='Category' ).click()
  expect(page.get_by_role('button', name='Category' )).to_be_visible()
  page.get_by_role('option', name='Family Outdoor' ).click()
  page.wait_for_url("**/regions/1/categories/11148")
  # bug here
  expect(page.get_by_role('button', name='Category' ),
    "Category button should still be visible").to_be_visible()



@pytest.mark.xfail()
def test_branch_link_opens_a_branch_page(set_up: Page):
  """BUG branches on the last page of search redirect to the main page instead of the branch page"""

  page = set_up
  page.goto("/regions/1/search");
  page.get_by_label("Goto Page 46").click()
  branch_link = page.get_by_role('link', name="Hot 哈拉影城 From TWD 240 0 (0)" )
  branch_url = branch_link.get_attribute('href')
  page.goto(branch_url)
  # bug here
  expect(page, "Branch page should be opened").to_have_url(branch_url)

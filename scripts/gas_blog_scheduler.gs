/**
 * KirokuFlow Blog Scheduler
 * 用途：定時檢查 Google Sheets 中的文章排程，將到期文章標記為 Published。
 * 實務上可延伸為呼叫 GitHub API 建立 Markdown commit。
 */
function publishScheduledPosts() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('blog_queue');
  const values = sheet.getDataRange().getValues();
  const header = values.shift();
  const statusCol = header.indexOf('status');
  const publishAtCol = header.indexOf('publish_at');
  const updatedAtCol = header.indexOf('updated_at');
  const now = new Date();

  values.forEach((row, i) => {
    const status = row[statusCol];
    const publishAt = new Date(row[publishAtCol]);
    if (status === 'Scheduled' && publishAt <= now) {
      const rowNumber = i + 2;
      sheet.getRange(rowNumber, statusCol + 1).setValue('Published');
      sheet.getRange(rowNumber, updatedAtCol + 1).setValue(now);
      // TODO: call GitHub Contents API to create or update markdown file.
    }
  });
}

function createHourlyTrigger() {
  ScriptApp.newTrigger('publishScheduledPosts')
    .timeBased()
    .everyHours(1)
    .create();
}

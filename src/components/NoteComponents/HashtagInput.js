import { useEffect } from "react";

function HashtagInput({ isEdited, noteText, hashtagInputRef }) {
  useEffect(() => {
    hashtagInputRef.current.innerHTML = noteText.replace(
      /(#\w+)/g,
      `<span class="hashtag">$1</span>`
    );
    hashtagInputRef.current.addEventListener("keyup", function (event) {
      let text = this.textContent;
      let highlighted = text.replace(
        /(#\w+)/g,
        `<span class="hashtag">$1</span>`
      );

      this.innerHTML = highlighted;
      placeCaretAtEnd(this);
    });
  }, []);

  //focus element function
  const placeCaretAtEnd = (el) => {
    el.focus();
    if (
      typeof window.getSelection != "undefined" &&
      typeof document.createRange != "undefined"
    ) {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  };

  return (
    <div
      ref={hashtagInputRef}
      className="hashtag-input"
      contentEditable={`${isEdited}`}
      suppressContentEditableWarning={true}
    ></div>
  );
}

export default HashtagInput;

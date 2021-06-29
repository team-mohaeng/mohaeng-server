# 커밋 컨벤션

- 모든 commit은 더 이상 쪼갤 수 없는 atomic한 단위로 수행한다.
    - 만약 stage 상태의 파일들이 서로 연관되어 있어 여러 개의 commit으로 쪼개기 힘든 경우, roll back 후 다시 atomic한 commit을 만든다.
    - 한 commit에 변경되는 파일의 갯수는 10개가 넘지 않도록 한다.

        ```
        예외)
        함수, class의 변경으로 참조하고 있는 다른 파일들도 수정되는 경우.
        폴더명이 변경되어 한꺼번에 파일이 삭제되거나 생성되는 경우.
        !HOTFIX의 경우.
        ```

---

## 메시지 구조

`tag: summary \n desc: ...` 형태로 한다.

태그 뒤에 ": "를 붙여 요약과 구별한다.

`desc` 는 선택사항이며 자세하게 작성한다.

`tag` 는 소문자로 작성한다.

---

## 태그 (tag)

![image](https://user-images.githubusercontent.com/49138331/123763250-8d5e6a80-d8fe-11eb-9b94-bfa03a8e37a0.png)

![image](https://user-images.githubusercontent.com/49138331/123763287-951e0f00-d8fe-11eb-9f00-ca8ccd2dc63b.png)

![image](https://user-images.githubusercontent.com/49138331/123763320-9bac8680-d8fe-11eb-8f65-313af9f45f6c.png)

---

## Summary

커밋 내용을 요약하여 작성한다.

되도록이면 한글로 가독성있게 작성한다.

추가 설명은 `desc` 에 작성한다.

---

## Desc

`summary` 의 부족한 부분을 자세하게 설명한다.

한글로 가독성있게 작성한다.

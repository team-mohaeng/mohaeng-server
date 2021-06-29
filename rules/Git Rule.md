# branch, issue, PR 규칙

## Tools

- terminal
- Merge는 PR을 적극 활용한다.

---

## Branch

- master (main)

- develop

    각자 local의 develop branch들에서 날아온 PR을 merge해 갱신한다.

    - local의 develop은 최신 상태로 항상 업데이트 한다. (pull)
    
- release

    LTS 버전을 저장한다.

    cloud에 배포하는 코드이다.

    master가 갱신된 경우 배포 cloud 서버도 갱신한다.

- feature/ (merge 후 삭제)

    ![Untitled](https://user-images.githubusercontent.com/49138331/123762154-7a976600-d8fd-11eb-8d49-fa4d43d9da05.png)

    각자 개발중인 기능을 나타낸다.

    github issue 번호와 연동해서 네이밍한다. `feature/기능명/#이슈번호`

---

## git-flow 시나리오

### 프로젝트 시작

초기 프로젝트를 구성해 remote-master 브랜치에 push한다.

remote-master에서 remote-develop을 생성한다.

### 각자 개발 작업

각자의 local-develop에서 개발할 기능을 issue에 적고, feature branch를 생성한다.

- 하나의 작업을 완료했다면
    1. 자신의 local에 remote-develop을 local-develop으로 pull해 최신으로 유지한다.
    2. local-develop과 local-feature을 merge한다.
    3. local-develop에서 remote-develop으로 PR을 보낸다.

### PR merge

각 팀원은 conflict가 발생하지 않도록 한다.

conflict 발생 시, 같이 협업해 충돌 부분을 개선한다.

공통으로 사용 및 수정하는 파일은 PR을 주기적으로 날리고, merge 한다.

코드의 모듈화를 진행해 conflict를 최소화한다.

---

## Issue

![Untitled 1](https://user-images.githubusercontent.com/49138331/123762208-897e1880-d8fd-11eb-8f6d-d08064669204.png)

기능 개발 전에 github issue를 적극 활용한다.

최소한의 기능을 기준으로 issue를 생성한다.

이슈 이름은 `[타이틀] 기능 설명` 으로 통일한다.

이슈 템플릿을 활용해 작업 설명과 진행 상황을 작성한다.

진행 상황은 checkbox(todo)로 작성한다.

---

## PR

![Untitled 2](https://user-images.githubusercontent.com/49138331/123762285-a0246f80-d8fd-11eb-9ae8-6442b3e65c39.png)

PR 작성 시 해당 기능의 이슈와 연동한다.

PR을 보내면 다른 팀원이 반드시 확인 후 코멘트를 달아준다.

모두 확인이 끝나면, merge 하고 만약 충돌이 발생한다면 협업해서 해결한다.
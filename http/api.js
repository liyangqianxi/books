import fly from './index';

export default {
    STATIC_HOST: 'https://statics.zhuishushenqi.com',
    getCats() {
        //获取大分类
        return fly.get('/cats/lv2/statistics');
    },
    getMinor() {
        //获取小分类
        return fly.get('/cats/lv2');
    },
    getCatsBooks(gender, type, major, minor, start) {
        if (minor) {
            //获取分类书籍  @param gender 性别排行（male）type 排行类型（hot）major 大类 minor 小类  start 分页开始
            return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=20`);
        } else {
            return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=${start}&limit=20`);
        }
    },
    bookInfo(book_id) {
        //书籍详情
        return fly.get(`/book/${book_id}`)
    },
    relatedRecommendedBooks(book_id) {
        //相关推荐
        return fly.get(`/book/${book_id}/recommend`);
    },
    authorBooks(author) {
        //作者名下的数据
        return fly.get(`/book/accurate-search?author=${author}`);
    },
    bookSources(book_id) {
        //书源  注意：第一个优质书源为收费源
        return fly.get(`/atoc?view=summary&book=${book_id}`);
    },
    bookChapters(id) {
        //书籍章节 根据书源id
        return fly.get(`/atoc/${id}?view=chapters`);
    },
    bookChaptersBookId(book_id) {
        //书籍章节 根据书id
        return fly.get(`/mix-atoc/${book_id}?view=chapters`);
    },
    chapterContent(link) {
        //章节内容
        return fly.get(
            `https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(
                link
            )}`
        );
    },
    hotWord() {
        //搜索热词
        return fly.get(`/book/hot-word`);
    },
    bookSearch(content) {
        //搜索内容
        return fly.get(
            `/book/fuzzy-search?start=0&limit=50&v=1&query=${content}`
        );
        //  return fly.get(`/book/fuzzy-search?start=${start}&limit=10&v=1&query=${content}`)
    },
    rankCategory() {
        //排名分类
        return fly.get(`/ranking/gender`);
    },
    // 排行
    rankInfo(rank_id) {
        //排名详情 rank_id 分类ID
        return fly.get(`/ranking/${rank_id}`);
    },
    discussions(book_id) {
        //讨论
        return fly.get(`/post/by-book?book=${book_id}`);
    },
    // shortReviews(book_id) {
    //     //短评
    //     return fly.get(
    //         `/post/short-review?book=${book_id}&total=true&sortType=newest`
    //     );
    // },
    shortReviews(book_id, start) { //短评、、评论
        return fly.get(`/post/short-review?book=${book_id}&limit=20&start=${start}&total=true&sortType=newest`)
    },
    bookReviews(book_id) {
        //长评  @param book_id 书籍id
        return fly.get(`/post/review/by-book?book=${book_id}`);
    },
    lists() {
        return fly.get(`/book-list`);
    },
    detail(id) {
        return fly.get(`/book-list/${book_id}`);
    }
};
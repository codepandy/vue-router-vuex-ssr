import '../assets/styles/footer.less';

export default {
    data() {
        return {
            author: 'WenMu',
        };
    },
    render() {
        return (
            <div id="footer">
                <span>Writter by {this.author}</span>
            </div>
        );
    },
};

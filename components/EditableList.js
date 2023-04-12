//Code forked from https://github.com/phos-dev/react-native-editable-list
import React, { Component } from 'react';
import { FlatList, Text, TextInput, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const styles = {
    component: {
        flexDirection: 'row',
        marginBottom: 20
    },
    input: {
        marginRight: 20,
        padding: 20,
        width: 250,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    cancel: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        width: '20%'
    }
};

class EditableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
            newInput: ''
        };
    }

    handleListItemChange = (text, index) => {
        const newList = [...this.state.list];
        newList[index] = text;
        this.setState({ list: newList }, () => {
            this.props.onListChange(this.state.list);
        });
    };

    deleteItem = (index) => {
        const newList = [...this.state.list];
        newList.splice(index, 1);
        this.setState({ list: newList }, () => {
            this.props.onListChange(this.state.list);
        }
        );
    };

    handleDeleteButtonClick = (index) => {
        return (event) => {
            event.preventDefault();
            this.deleteItem(index);
        }
    };

    getList = () => {
        return (
            <FlatList
                data={this.state.list}
                keyExtractor={(_item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.component}>
                        <TextInput
                            value={item}
                            placeholder={this.props.placeholder}
                            onChangeText={text => {
                                this.handleListItemChange(text, index);
                            }}
                            onEndEditing={e => {
                                e.nativeEvent.text.length === 0 ? this.deleteItem(index) : null
                            }}
                            style={styles.input}
                        />
                        <TouchableOpacity style={styles.cancel} onPress={() => this.deleteItem(index)}>
                            <View>
                                <Text>✖</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />
        );
    }

    onChange = (text) => {
        this.setState({
            newInput: text
        });
    };

    Add = (event) => {
        if (event.nativeEvent.text.trim(' ').length > 0) {
            const newList = [...this.state.list];
            this.setState({ list: newList.concat(event.nativeEvent.text), newInput: '' }, () => {
                this.props.onListChange(this.state.list);
            });
        }
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <TextInput
                    name='newInput'
                    onChangeText={this.onChange}
                    onEndEditing={this.Add}
                    placeholder={this.props.placeholder}
                    value={this.state.newInput}
                    style={{ ...styles.input, borderRadius: 20, width: 300, marginBottom: 20, marginRight: 0 }}
                    readOnly={this.props.preventAdd}
                />
                {this.getList()}
            </View>
        );
    }
}

EditableList.propTypes = {
    list: PropTypes.array.isRequired,
    onListChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    preventAdd: PropTypes.bool
}

EditableList.defaultProps = {
    list: [],
    placeholder: 'Type Something',
};

export default EditableList;

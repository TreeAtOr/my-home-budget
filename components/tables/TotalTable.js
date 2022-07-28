import {Table, Text} from "@nextui-org/react"

function renderPercentage(val) {
    if(val === null || val === undefined) return (<Text size={16} b color='red'>∞% ↑</Text>);
    else if(val === 0) return (<Text size={16} b color='orange'>0%</Text>);
    else if(val > 0) return (<Text size={16} b color='red'>{val}% ↑</Text>); else return (<Text size={14} b color='green'>{val}% ↓</Text>);
}

export function TotalTable({ data,rowsPerPage  }) {
    return (<Table
        aria-label="Total table"
        css={{
            height: "auto",
            minWidth: "100%",
        }}
    >
        <Table.Header>
            <Table.Column>KIND</Table.Column>
            <Table.Column>PLAN</Table.Column>
            <Table.Column>FACT</Table.Column>
            <Table.Column>CHANGE</Table.Column>
        </Table.Header>
        <Table.Body items={data}>
            {(item) => (
                <Table.Row key={item.kind}>
                    <Table.Cell>{item.kind}</Table.Cell>
                    <Table.Cell>{item.plan}</Table.Cell>
                    <Table.Cell>{item.fact}</Table.Cell>
                    <Table.Cell>{renderPercentage(item.percentage)}</Table.Cell>
                </Table.Row>
            )}
        </Table.Body>
        <Table.Pagination
            shadow
            noMargin
            align="center"
            rowsPerPage={rowsPerPage}
            onPageChange={(page) => console.log({ page })}
        />
    </Table>)
}
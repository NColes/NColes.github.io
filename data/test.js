$(function () {
    $('#test').highcharts({
        data: {
            table: 'datatable'
        },
        chart: {
            type: 'column'
        },
        title: {
            text: 'Progress'
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: 'Units'
            }
        },
    });
});

	<table id="datatable">
		<thead>
			<tr><th>Status</th><th>September</th><th>October</th></tr></thead>
		<tbody>
		<tr>
			<th>On board</th>
			<td>2</td>
<td>2</td>
		</tr>
		<tr>
			<th>In progress</th>
			<td>4</td>
<td>2</td>
		</tr>
		<tr>
			<th>Not invited</th>
			<td>1</td>
<td>2</td>
		</tr>
		</tbody>
	</table>
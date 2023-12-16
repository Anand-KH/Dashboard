import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BankService } from '../../service/bank.service';
// import Highcharts from 'highcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { MatSort, SortDirection } from '@angular/material/sort';
// import { merge,catchError, map, startWith, switchMap,of as observableOf } from 'rxjs';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

export interface transaction {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  savingPlan: any[] = [
    {
      icon: 'fa-regular fa-clock',
      title: 'New Watch',
      Target: '$2,000',
      invest: '$1,000',
      percentage: '50%',
    },
    {
      icon: 'fa-solid fa-gamepad',
      title: 'Play Station 5',
      Target: '$2,000',
      invest: '$1,000',
      percentage: '50%',
    },
  ];
  paymentBalance: any;
  chartSeries: ApexAxisChartSeries = [
    {
      name: 'Income',
      data: [10, 20, 30, 40, 85, 10, 5, 62, 14, 25, 35],
    },
    {
      name: 'Expense',
      data: [50, 10, 50, 47, 5, 41, 25, 36, 14, 52, 85],
    },
    {
      name: 'Investment',
      data: [30, 50, 66, 25, 21, 20, 58, 32, 54, 58, 20],
    },
  ];
  // xValue: ApexXAxis;
  chartLabel = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  chartDetails: ApexChart = {
    type: 'bar',
    height: 350,
    toolbar: {
      show: true,
    },
  };

  moneyStats: any;
  displayedColumns: string[] = [
    'date',
    'name',
    'status',
    'type',
    'time',
    'amount',
    'action',
  ];
  // dataSource:MatTableDataSource<transaction>=[];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  // Highcharts: any;@Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  // @ViewChild('chart') chart: ChartComponent;
  // public chartOptions: Partial<ChartOptions>;
  // @ViewChild(MatSort) sort: MatSort;

  // @ViewChild(MatPaginator) paginator: MatPaginator=10;
  constructor(private bankService: BankService, public dialog: MatDialog) {}
  ngAfterViewInit() {}
  ngOnInit(): void {
    this.getDetails();
  }

  getDetails() {
    this.bankService.bankResponse().subscribe((res) => {
      this.paymentBalance = res.balance;
      this.moneyStats = res.money_statistics;
      this.moneyStats = res.money_statistics;
      this.dataSource = new MatTableDataSource(res.transactions);
    });
  }

  openDialog(event: any) {
    this.dialog.open(DialogComponent, {
      data: event,
      width: '300px',
    });
  }
}
